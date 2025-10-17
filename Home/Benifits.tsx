// app/Home/Benefits.tsx  (rename your file from Benifits.tsx to avoid confusion)
import { client } from "../sanity/lib/sanity.client";

const query = `*[_type == "benefit"][0]{
  title,
  items[]{icon, heading, text}
}`;

export default async function Benefits() {
  const benefits = await client.fetch(query);

  if (!benefits) return null; // or show a fallback

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 heading">{benefits.title}</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {benefits.items?.map((item: any, index: number) => (
            <div key={index}>
              <div className="text-4xl mb-4 ">{item.icon}</div>
              <h3 className="font-semibold text-xl heading ">{item.heading}</h3>
              <p className="text-[#6B7280] mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
