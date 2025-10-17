import { Star } from "lucide-react"
import { client } from "../sanity/lib/sanity.client"

const query = `*[_type == "testimonial"][0]{
  title,
  backgroundColor,
  cardBackground,
  starColor,
  reviews[]{name, text, rating}
}`

export default async function Testimonials() {
  const testimonials = await client.fetch(query)

  if (!testimonials) return null

  return (
    <section
      style={{ backgroundColor: testimonials.backgroundColor }}
      className="py-20"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#111111]">
          {testimonials.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.reviews?.map((review: any, i: number) => (
            <div
              key={i}
              className="p-6 rounded-lg shadow-md hover:shadow-lg transition"
              style={{ backgroundColor: testimonials.cardBackground }}
            >
              <div className="flex justify-center mb-4">
                {[...Array(review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill={testimonials.starColor}
                    stroke="none"
                  />
                ))}
              </div>
              <p className="text-[#333333] italic mb-4">"{review.text}"</p>
              <h3 className="font-semibold text-[#111111]">{review.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
