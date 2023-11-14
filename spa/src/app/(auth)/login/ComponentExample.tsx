import Image from 'next/image';
import Button from 'react-bootstrap/Button';

type Props = {
    variant: string;
    children: React.ReactNode;
};

export default function ComponentExample({ variant, children }: Props) {
    return <Button variant={variant}>{children}</Button>;
}
