import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { flushSync } from 'react-dom';

import { useUpdateBusiness } from '@/features/businesses/application/useUpdateBusiness';
import { businessPriorityOptions } from '@/features/businesses/presentation/lib/businessSelectOptions';
import { useAssigneeOptions } from '@/hooks';
import { useCancelFollowUp } from '@/features/follow-ups/application/useCancelFollowUp';
import { followUpsQueryKeys } from '@/features/follow-ups/application/followUps.queryKeys';
import { useMarkFollowUpDone } from '@/features/follow-ups/application/useMarkFollowUpDone';
import { useUpdateFollowUp } from '@/features/follow-ups/application/useUpdateFollowUp';
import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import type { Priority } from '@/shared/api/generated/salesTrackerApi';

export type BusinessDetailsFormValues = {
  assignedToId: string;
  dueDate: string;
  priority: Priority;
};

export type NotesFormValues = {
  note: string;
};

const formatDateForInput = (dateValue: string): string => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  );

  return offsetDate.toISOString().slice(0, 16);
};

const parseInputDateToIso = (dateValue: string): string =>
  new Date(dateValue).toISOString();

type UseFollowUpDetailsDrawerParams = {
  followUp: FollowUpTask;
};

export const useFollowUpDetailsDrawer = ({
  followUp,
}: UseFollowUpDetailsDrawerParams) => {
  const [currentFollowUp, setCurrentFollowUp] = useState(followUp);
  const [isEditingBusinessDetails, setIsEditingBusinessDetails] =
    useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const dueDateInputRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();
  const updateFollowUpMutation = useUpdateFollowUp();
  const updateBusinessMutation = useUpdateBusiness();
  const markFollowUpDoneMutation = useMarkFollowUpDone();
  const cancelFollowUpMutation = useCancelFollowUp();
  const { assigneeOptions, isAssigneeSelectDisabled } = useAssigneeOptions();

  const businessDetailsForm = useForm<BusinessDetailsFormValues>({
    mode: 'onChange',
    defaultValues: {
      assignedToId: currentFollowUp.assignedTo.id,
      dueDate: formatDateForInput(currentFollowUp.dueDate),
      priority: currentFollowUp.business.priority,
    },
  });
  const notesForm = useForm<NotesFormValues>({
    defaultValues: {
      note: currentFollowUp.note ?? '',
    },
  });

  useEffect(() => {
    setCurrentFollowUp(followUp);
  }, [followUp]);

  useEffect(() => {
    businessDetailsForm.reset({
      assignedToId: currentFollowUp.assignedTo.id,
      dueDate: formatDateForInput(currentFollowUp.dueDate),
      priority: currentFollowUp.business.priority,
    });
    notesForm.reset({
      note: currentFollowUp.note ?? '',
    });
  }, [businessDetailsForm, currentFollowUp, notesForm]);

  const isSavingBusinessDetails =
    updateFollowUpMutation.isPending || updateBusinessMutation.isPending;

  const handleBusinessDetailsSubmit = businessDetailsForm.handleSubmit(
    async (values) => {
      const updatedFollowUp = await updateFollowUpMutation.mutateAsync({
        followUpId: currentFollowUp.id,
        data: {
          assignedToId: values.assignedToId,
          dueDate: parseInputDateToIso(values.dueDate),
        },
      });

      const updatedBusiness = await updateBusinessMutation.mutateAsync({
        businessId: currentFollowUp.business.id,
        data: {
          priority: values.priority,
        },
      });

      setCurrentFollowUp((previousFollowUp) => ({
        ...previousFollowUp,
        assignedTo: updatedFollowUp.assignedTo,
        business: {
          ...previousFollowUp.business,
          priority: updatedBusiness.priority,
        },
        dueDate: updatedFollowUp.dueDate,
        updatedAt: updatedFollowUp.updatedAt,
      }));

      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.lists,
      });

      setIsEditingBusinessDetails(false);
    },
  );

  const handleNotesSubmit = notesForm.handleSubmit(async (values) => {
    const updatedFollowUp = await updateFollowUpMutation.mutateAsync({
      followUpId: currentFollowUp.id,
      data: {
        note: values.note.trim(),
      },
    });

    setCurrentFollowUp((previousFollowUp) => ({
      ...previousFollowUp,
      note: updatedFollowUp.note,
      updatedAt: updatedFollowUp.updatedAt,
    }));

    queryClient.invalidateQueries({
      queryKey: followUpsQueryKeys.lists,
    });

    setIsEditingNotes(false);
  });

  const handleMarkComplete = async () => {
    const updatedFollowUp = await markFollowUpDoneMutation.mutateAsync(
      currentFollowUp.id,
    );

    setCurrentFollowUp((previousFollowUp) => ({
      ...previousFollowUp,
      completedAt: updatedFollowUp.completedAt,
      status: updatedFollowUp.status,
      updatedAt: updatedFollowUp.updatedAt,
    }));
  };

  const handleCancelFollowUp = async () => {
    const updatedFollowUp = await cancelFollowUpMutation.mutateAsync(
      currentFollowUp.id,
    );

    setCurrentFollowUp((previousFollowUp) => ({
      ...previousFollowUp,
      completedAt: updatedFollowUp.completedAt,
      status: updatedFollowUp.status,
      updatedAt: updatedFollowUp.updatedAt,
    }));
  };

  const handleReschedule = () => {
    flushSync(() => {
      setIsEditingBusinessDetails(true);
    });

    const dueDateInput = dueDateInputRef.current;

    if (!dueDateInput) {
      return;
    }

    dueDateInput.focus();

    if ('showPicker' in dueDateInput) {
      try {
        dueDateInput.showPicker();
      } catch {
        // Some browsers only allow showPicker during stricter user activation windows.
      }
    }
  };

  const handleCancelBusinessDetailsEdit = () => {
    businessDetailsForm.reset();
    setIsEditingBusinessDetails(false);
  };

  const handleCancelNotesEdit = () => {
    notesForm.reset();
    setIsEditingNotes(false);
  };

  return {
    assigneeOptions,
    businessPriorityOptions,
    cancelFollowUp: handleCancelFollowUp,
    currentFollowUp,
    dueDateField: businessDetailsForm.register('dueDate', { required: true }),
    dueDateInputRef,
    editBusinessDetails: () => {
      setIsEditingBusinessDetails(true);
    },
    editNotes: () => {
      setIsEditingNotes(true);
    },
    formControl: businessDetailsForm.control,
    formState: businessDetailsForm.formState,
    isAssigneeSelectDisabled,
    isCancellingFollowUp: cancelFollowUpMutation.isPending,
    isEditingBusinessDetails,
    isEditingNotes,
    isMarkingComplete: markFollowUpDoneMutation.isPending,
    isSavingNotes: updateFollowUpMutation.isPending,
    isSavingBusinessDetails,
    markComplete: handleMarkComplete,
    notesFormState: notesForm.formState,
    notesField: notesForm.register('note'),
    reschedule: handleReschedule,
    saveBusinessDetails: handleBusinessDetailsSubmit,
    saveNotes: handleNotesSubmit,
    stopEditingBusinessDetails: handleCancelBusinessDetailsEdit,
    stopEditingNotes: handleCancelNotesEdit,
  };
};
