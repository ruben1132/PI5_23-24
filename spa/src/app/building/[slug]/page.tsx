"use client";

interface Props {
    params: { slug: string };
}


export default function Page({ params }: Props) {

  return (
    <div>
      <p>Building: {params.slug}</p>
    </div>
  );
}
