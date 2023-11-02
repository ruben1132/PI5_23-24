"use client";

interface Props {
    params: { slug: string };
}


export default function Page({ params }: Props) {

  return (
    <div>
      <p>Floor: {params.slug}</p>
    </div>
  );
}
