import { CardContent } from './CardContent';
import { CardDescription } from './CardDescription';
import { CardHeader } from './CardHeader';
import { CardRoot } from './CardRoot';
import { CardTitle } from './CardTitle';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Title: CardTitle,
  Description: CardDescription,
});
