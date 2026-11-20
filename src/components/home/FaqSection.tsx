'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react'
import SplitText from '../reactbits/SplitText'
import DrawLine from '../reactbits/DrawLine'

interface FaqItem {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: 'Where is Hestiia Restaurant located in Shyam Nagar, Kanpur?',
    answer:
      'Hestiia Restaurant is located at 1-B, Ram Puram, Above Jawed Habib, Shyam Nagar, Kanpur, Uttar Pradesh 208013. We are conveniently situated near PAC Kanpur, easily accessible from Harjinder Nagar, Chakeri, Rama Devi, Naubasta, and Yashoda Nagar.',
  },
  {
    question: 'Is Hestiia Restaurant 100% pure vegetarian?',
    answer:
      'Yes, Hestiia is a certified 100% pure vegetarian restaurant in Shyam Nagar, Kanpur. We do not use, store, or prepare any meat, poultry, seafood, or eggs in our kitchen. All dishes are crafted using farm-fresh vegetables, dairy paneer, and pure desi ghee.',
  },
  {
    question: 'What cuisines and signature dishes are served at Hestiia?',
    answer:
      'We serve over 193 authentic pure vegetarian delicacies across North Indian heritage curries (Paneer Butter Masala, Dal Makhani, Shahi Paneer, Kadhai Paneer), hot tandoori breads, sizzling Indo-Chinese wok specialties (Hakka Noodles, Crispy Chilli Paneer, Manchurian), handcrafted pizzas, gourmet burgers, sandwiches, and traditional desserts.',
  },
  {
    question: 'What is the average cost per person at Hestiia Restaurant?',
    answer:
      'Hestiia offers premium dining at an affordable price of ₹200 to ₹400 per person. Whether you are visiting for a quick lunch, family dinner, or weekend celebration, our extensive menu offers great quality and generous portions at honest prices.',
  },
  {
    question: 'Is Hestiia a family-friendly restaurant in Shyam Nagar?',
    answer:
      'Yes! Hestiia is widely recognized as one of the best family restaurants in Shyam Nagar, Kanpur. We offer comfortable, spacious seating, warm hospitality, child-friendly dining choices, and a peaceful acoustic atmosphere ideal for family get-togethers and multi-generational dinners.',
  },
  {
    question: 'Do you host birthday parties, anniversaries, and family celebrations?',
    answer:
      'Yes, we have a dedicated private dining and event space perfect for birthday celebrations, kitty parties, anniversaries, and family banquets. We offer customized party menus, welcome mocktails, table arrangements, and full celebration assistance.',
  },
  {
    question: 'Does Hestiia provide food delivery in Shyam Nagar and nearby areas?',
    answer:
      'Yes, we provide fast pure vegetarian home delivery across Shyam Nagar, Ram Puram, Chakeri, Harjinder Nagar, Naubasta, Yashoda Nagar, and Kidwai Nagar. You can place orders directly through our website or via our delivery partners.',
  },
  {
    question: 'What are the operating hours of Hestiia Restaurant?',
    answer:
      'We are open 7 days a week from 11:00 AM to 11:00 PM for dine-in lunch and dinner, parcel takeaways, and home delivery.',
  },
  {
    question: 'Is parking available at Hestiia Restaurant?',
    answer:
      'Yes, ample roadside and dedicated parking space is available for two-wheelers and four-wheelers directly outside the restaurant premises in Ram Puram, Shyam Nagar.',
  },
  {
    question: 'How can I reserve a table or order food?',
    answer:
      'You can book a table directly through our website booking form, call our reception at +91 78808 40622, or message us on WhatsApp. Table bookings can also be placed through verified partner apps including District, Zomato Dining, and EazyDiner.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section
      id="faq"
      className="section"
      aria-labelledby="faq-heading"
      style={{
        backgroundColor: '#16110E',
        borderTop: '1px solid rgba(184, 154, 100, 0.15)',
        paddingTop: 'clamp(56px, 7vw, 96px)',
        paddingBottom: 'clamp(56px, 7vw, 96px)',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-brass)',
              marginBottom: '10px',
            }}
          >
            <HelpCircle size={14} />
            Frequently Asked Questions
          </span>

          <h2
            id="faq-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 300,
              color: 'var(--color-text-inverse)',
              margin: '0 0 10px 0',
              lineHeight: 1.2,
            }}
          >
            <SplitText as="span">Everything You Wish to Know About</SplitText>{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-brass)' }}>Hestiia</em>
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DrawLine
              color="var(--color-brass, #B89A64)"
              height="2px"
              origin="center"
              duration={0.8}
              style={{ width: '48px', margin: '8px auto 16px auto' }}
            />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'rgba(246, 239, 228, 0.7)',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Essential information regarding our pure vegetarian standards, Kanpur dining sanctuary, reservations, and culinary craft.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(31, 26, 22, 0.85)',
                  border: isOpen
                    ? '1px solid rgba(184, 154, 100, 0.45)'
                    : '1px solid rgba(184, 154, 100, 0.18)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease, background-color 0.25s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: 'var(--color-text-inverse)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      fontWeight: 500,
                      color: isOpen ? 'var(--color-brass)' : 'rgba(246, 239, 228, 0.95)',
                      lineHeight: 1.4,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      flexShrink: 0,
                      color: 'var(--color-brass)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 20px 24px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: 'rgba(246, 239, 228, 0.78)',
                      borderTop: '1px solid rgba(184, 154, 100, 0.1)',
                      paddingTop: '16px',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Pure Veg Guarantee Ribbon below FAQ */}
        <div
          style={{
            marginTop: '32px',
            padding: '16px 20px',
            borderRadius: '8px',
            backgroundColor: 'rgba(47, 125, 79, 0.12)',
            border: '1px solid rgba(47, 125, 79, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontSize: '13px',
            color: '#4ADE80',
            textAlign: 'center',
          }}
        >
          <ShieldCheck size={18} />
          <span>
            <strong>100% Pure Vegetarian Assurance:</strong> All dairy, oils, sauces, and spices are strictly plant and milk-based.
          </span>
        </div>
      </div>
    </section>
  )
}
