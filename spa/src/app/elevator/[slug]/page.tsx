"use client";

interface Props {
    params: { slug: string };
}


export default function Page({ params }: Props) {

  return (
    <div>
      <p>Elevator: {params.slug}</p>
    </div>
  );
}
