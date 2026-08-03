import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { flushSync } from 'react-dom';

import { useAssigneeOptions } from '@/hooks';
import { useCancelFollowUp } from '@/features/follow-ups/application/useCancelFollowUp';
import { followUpsQueryKeys } from '@/features/follow-ups/application/followUps.queryKeys';
import { useMarkFollowUpDone } from '@/features/follow-ups/application/useMarkFollowUpDone';
import { useUpdateFollowUp } from '@/features/follow-ups/application/useUpdateFollowUp';
import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';

export type FollowUpDetailsFormValues = {
  assignedToId: string;
  dueDate: string;
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
  const [isEditingFollowUpDetails, setIsEditingFollowUpDetails] =
    useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const dueDateInputRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();
  const updateFollowUpMutation = useUpdateFollowUp();
  const markFollowUpDoneMutation = useMarkFollowUpDone();
  const cancelFollowUpMutation = useCancelFollowUp();
  const { assigneeOptions, isAssigneeSelectDisabled } = useAssigneeOptions();

  const followUpDetailsForm = useForm<FollowUpDetailsFormValues>({
    mode: 'onChange',
    defaultValues: {
      assignedToId: currentFollowUp.assignedTo.id,
      dueDate: formatDateForInput(currentFollowUp.dueDate),
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

  const canEditFollowUp = currentFollowUp.status === 'pending';

  useEffect(() => {
    if (!canEditFollowUp) {
      setIsEditingFollowUpDetails(false);
      setIsEditingNotes(false);
    }
  }, [canEditFollowUp]);

  useEffect(() => {
    followUpDetailsForm.reset({
      assignedToId: currentFollowUp.assignedTo.id,
      dueDate: formatDateForInput(currentFollowUp.dueDate),
    });
    notesForm.reset({
      note: currentFollowUp.note ?? '',
    });
  }, [currentFollowUp, followUpDetailsForm, notesForm]);

  const isSavingFollowUpDetails = updateFollowUpMutation.isPending;

  const handleFollowUpDetailsSubmit = followUpDetailsForm.handleSubmit(
    async (values) => {
      if (!canEditFollowUp) {
        return;
      }

      const updatedFollowUp = await updateFollowUpMutation.mutateAsync({
        followUpId: currentFollowUp.id,
        data: {
          assignedToId: values.assignedToId,
          dueDate: parseInputDateToIso(values.dueDate),
        },
      });

      setCurrentFollowUp((previousFollowUp) => ({
        ...previousFollowUp,
        assignedTo: updatedFollowUp.assignedTo,
        dueDate: updatedFollowUp.dueDate,
        isOverdue: updatedFollowUp.isOverdue,
        updatedAt: updatedFollowUp.updatedAt,
      }));

      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.lists,
      });

      setIsEditingFollowUpDetails(false);
    },
  );

  const handleNotesSubmit = notesForm.handleSubmit(async (values) => {
    if (!canEditFollowUp) {
      return;
    }

    const updatedFollowUp = await updateFollowUpMutation.mutateAsync({
      followUpId: currentFollowUp.id,
      data: {
        note: values.note.trim(),
      },
    });

    setCurrentFollowUp((previousFollowUp) => ({
      ...previousFollowUp,
      isOverdue: updatedFollowUp.isOverdue,
      note: updatedFollowUp.note,
      updatedAt: updatedFollowUp.updatedAt,
    }));

    queryClient.invalidateQueries({
      queryKey: followUpsQueryKeys.lists,
    });

    setIsEditingNotes(false);
  });

  const handleMarkComplete = async (note?: string) => {
    if (currentFollowUp.status !== 'pending') {
      return;
    }

    const updatedFollowUp = await markFollowUpDoneMutation.mutateAsync({
      followUpId: currentFollowUp.id,
      note,
    });

    setCurrentFollowUp((previousFollowUp) => ({
      ...previousFollowUp,
      completedAt: updatedFollowUp.completedAt,
      isOverdue: updatedFollowUp.isOverdue,
      status: updatedFollowUp.status,
      updatedAt: updatedFollowUp.updatedAt,
    }));
  };

  const handleCancelFollowUp = async (note?: string) => {
    if (currentFollowUp.status !== 'pending') {
      return;
    }

    const updatedFollowUp = await cancelFollowUpMutation.mutateAsync({
      followUpId: currentFollowUp.id,
      note,
    });

    setCurrentFollowUp((previousFollowUp) => ({
      ...previousFollowUp,
      completedAt: updatedFollowUp.completedAt,
      isOverdue: updatedFollowUp.isOverdue,
      status: updatedFollowUp.status,
      updatedAt: updatedFollowUp.updatedAt,
    }));
  };

  const handleReschedule = () => {
    if (!canEditFollowUp) {
      return;
    }

    flushSync(() => {
      setIsEditingFollowUpDetails(true);
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

  const handleCancelFollowUpDetailsEdit = () => {
    followUpDetailsForm.reset();
    setIsEditingFollowUpDetails(false);
  };

  const handleCancelNotesEdit = () => {
    notesForm.reset();
    setIsEditingNotes(false);
  };

  return {
    assigneeOptions,
    canEditFollowUp,
    cancelFollowUp: handleCancelFollowUp,
    currentFollowUp,
    dueDateField: followUpDetailsForm.register('dueDate', { required: true }),
    dueDateInputRef,
    editFollowUpDetails: () => {
      if (canEditFollowUp) {
        setIsEditingFollowUpDetails(true);
      }
    },
    editNotes: () => {
      if (canEditFollowUp) {
        setIsEditingNotes(true);
      }
    },
    formControl: followUpDetailsForm.control,
    formState: followUpDetailsForm.formState,
    isAssigneeSelectDisabled,
    isCancellingFollowUp: cancelFollowUpMutation.isPending,
    isEditingFollowUpDetails,
    isEditingNotes,
    isMarkingComplete: markFollowUpDoneMutation.isPending,
    isSavingNotes: updateFollowUpMutation.isPending,
    isSavingFollowUpDetails,
    markComplete: handleMarkComplete,
    notesFormState: notesForm.formState,
    notesField: notesForm.register('note'),
    reschedule: handleReschedule,
    saveFollowUpDetails: handleFollowUpDetailsSubmit,
    saveNotes: handleNotesSubmit,
    stopEditingFollowUpDetails: handleCancelFollowUpDetailsEdit,
    stopEditingNotes: handleCancelNotesEdit,
  };
};
