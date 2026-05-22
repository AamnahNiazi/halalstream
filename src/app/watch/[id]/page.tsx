interface Props {
  params: {
    id: string;
  };
}

export default function WatchPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <iframe
          className="w-full aspect-video rounded-3xl"
          src={`https://www.youtube.com/embed/${params.id}?rel=0&modestbranding=1&iv_load_policy=3&controls=1`}
          allowFullScreen
        />

        <div className="mt-8 p-6 bg-slate-900 rounded-3xl">
          <h2 className="text-2xl font-bold mb-3">
            Reflection Space
          </h2>

          <p className="text-slate-300">
            Calm and distraction-free Islamic viewing.
          </p>
        </div>
      </div>
    </main>
  );
}