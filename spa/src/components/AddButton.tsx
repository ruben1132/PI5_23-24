'use client'

import Button from 'react-bootstrap/Button';

interface Props{
    type: string;
}

export default function AddButton(props: Props) {
    return (
            <Button variant="success">Add {props.type}</Button>
    )
}
