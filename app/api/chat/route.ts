import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json

  const lastMessage = messages[messages.length - 1]

  // const userId = (await auth())?.user.id

  // if (!userId) {
  //   return new Response('Unauthorized', {
  //     status: 401
  //   })
  // }

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  const context = `

  First Trial 
  Book A Mat 
  
  First Trial 
  Book A Mat 
  LAVA Yoga Singapore 
  Why LAVA? 
  Hot Yoga Benefits 
  Programs 
  Price 
  Members' Perks 
  Locate Us 
  First Trial 
  Book A Mat 
  LAVA Yoga Singapore 
  Why LAVA Yoga Singapore? 
  Why LAVA Yoga Singapore?
  Women-only Hot Yoga Studio in Singapore 
  The LAVA Yoga Difference
  Four Reasons To Choose Us
  Reason1Hinoki x Hot Stone Studio
  Hinoki x Hot Stone Anti-ageing & Skin Benefit
  Most effective in lava yoga history!
   
  LAYER 1: HINOKI WOOD FLOORING
  Containing the “Phytoncide” effect, Hinoki cypress permeates a distinctive scent that can improve your health and skin while it relaxes you so that you can be more present in class.
  LAYER 2: EXCLUSIVE HOT STONES
  Specially made for LAVA Yoga, these hot stones contain silica which can emit far-infrared radiation (FIR). FIR transfers energy purely in the form of heat and can generate therapeutic effects.
  LAYER 3: HEATING PANELS
  Underneath the Hinoki floor are heating panels. The floor heating panels warm your body from the feet, promoting healthier blood circulation.
  
     
  *Telomore Genes
  Telomere is the end of a chromosome, made of repetitive DNA sequences. They get shorter each time a cell duplicates. When they get too short, our cells will age and not work properly.
  **Sirtuin Genes
  Sirtuin is a protein that regulates your cellular health. They are key in regulating cellular homeostasis, keeping cells in balance and, anti-aging and healthy metabolic activities.
  Reason2Number 1 Hot Yoga brand In Japan
   
  More than
  420studios in Japan
  LAVA Yoga is the leading hot yoga brand with more than 420 studios in Japan.
  We have made over 1.5 million women happier and healthier.
  Reason3Multiple Benefits To Mind & Body
  98% of respondents said "Yes!"
  to at least one benefit of practising hot yoga
    
  With 10 years of experience in operating yoga studios, LAVA Yoga currently has 700,000 members onboard and the numbers are increasing!
  Number4Unification of Music & Hot Yoga
   
  Get energised with our unique hot yoga programs accompanied by original music! The music has been specially crafted and composed to perfectly complement each lesson. It acts as a guide for a natural flow and better efficacy as you execute the various poses. The music also encourages relaxation and aids concentration as you head into deep breathing and stretching.
  Lava Yoga specialises in Hot Yoga.
  Hot Yoga is known to encourage and increase the amount of perspiration of the body. This helps remove toxins while accelerating your body’s metabolism, which can result in healthy weight loss. Our unique and specially designed programs with accompanying original music are easy to follow for all levels even for beginners.
  Let us help you achieve a healthier body and mind.
  Book Your Mat
  Frequently Asked Questions
  What are your safety measures? 
  IN & OUT
  Strictly no talking in the studio before and/or after class. There should be no chatting in common areas, and all students must leave the premise after class has ended. If you have any enquiry regarding your membership or class, one of our teachers who will be at the reception can attend to you. Although we have 2 changing rooms, please come to class ready in your sports attire until the mandatory safety measures are eased up.
  MAT & TOWEL
  You must cover your mat with the towel provided. We'll hand you one bath towel and one face towel when checking in. You can, of course, bring your own yoga mat, bath towel and/or face towel, if you prefer.
  Can I eat before and after class? 
  We recommend having meals 2 hours before class and 1 hour after class.
  Do I need to book a class before turning up? 
  No, you can just do a walk-in, but it is subject to availability. As the booking window closes one hour before class online, you may give us a call/text to check if there are any available mats left. Always check beforehand to prevent any wasted trip to the studio, as some classes/timings may be more popular than others! 
  How early should I reach for class? 
  Please arrive at least 15 minutes before class starts. This will allow you time to settle down. Latecomers will not be permitted to join the class as the doors will be locked.
  Do I need to bring a towel? 
  Fresh towels are provided. You are also welcome to bring your towels.
  Do I need to bring my own yoga mat? 
  We provide non-slip yoga mats which are disinfected after every class. You are also welcome to bring your own yoga mat. 
  What to wear and bring to class? 
  Our new location is situated conveniently near the clean washrooms at Great World. Please come to the studio in your comfortable sportswear attire. Don't forget to bring a big bottle of water to keep yourself hydrated. 
  What kind of facilities are provided? 
  We provide combination lockers, non-slip yoga mats which are disinfected after every class and fresh towels. We do not have any shower rooms but changing rooms are available. 
  How is your studio different from other hot yoga studios? 
  WOMEN ONLY
  We are Singapore's one and only hot yoga studios for women. All our yoga teachers and office staff are females. This is to allow optimal privacy and ultimate comfort for our female students during practice.
  FOR WOMEN, BY WOMEN
  Our mission is to help women attain happiness, health and fulfilment of their holistic goals through our "Love for People" philosophy. Programs are catered to the health and beauty of women.
  FROM TOKYO, JAPAN
  LAVA Yoga is the leading hot yoga brand with more than 420 studios in Japan. We have made over 1.5 million women happier and healthier. With 10 years of experience in operating yoga studios, LAVA Yoga currently has 700,000 members on board, and the numbers are increasing!
  HOT YOGA
  Lava Yoga specialises in Hot Yoga. Hot Yoga is known to encourage and increase the amount of perspiration of the body. This helps remove toxins while accelerating your body's metabolism, which can result in healthy weight loss. From time to time, we do have yoga classes conducted in a non-hot yoga environment. Watch out for our special classes!
  UNIQUE STUDIO
  Enjoy our hot yoga classes with soothing original music composed by LAVA that boosts concentration and efficacy. That's not all! We use chakra lightings in the studio. The colour changes according to the union of your asanas and the chakra healing techniques. The chakra colours reflect different frequencies of light and energy associated with each energy centre. Our new studio also uses modern underfloor heating systems, from Japan! This unique system warms our body from the inside thus improving our blood circulation - perfect for those with allergies and vein problems. 
  What are your floors made of? 
  Our new studio also uses modern underfloor heating systems, from Japan, called HINOKI FLOORING! This unique system warms our body from the inside thus improving our blood circulation - perfect for those with allergies and vein problems.
  Since ancient times, Japanese cypress is loved by the Japanese. This wood has been used for the construction of temples and shrines. Cypress wood is not only strong and durable, but it also has a unique scent called "phytoncide" that provides a relaxing effect. Phytoncide refreshes the mind and body as the distinctive scent transports you to the calming forest, as this scent is mainly found in coniferous trees such as cypress and pine.
  More Questions? Email us!
  Experience Japan's No. 1 Hot Yoga Brand!
  Book your mat now
  +65-6636-1562 
  Weekdays: 8am - 10pm | Weekends: 9am - 6pm
  
  Booking is mandatory.
  ※Bring a litre of water bottle and wear comfortable attire! 
  ※Arrive 15 minutes earlier. Latecomers are not allowed to enter. 
  ※We provide clean yoga mats, towels, and combination lockers. 
  
  
  Women-only Hot Yoga Studio In Singapore
  Experience LAVA
  LAVA Yoga Singapore 
  Why LAVA 
  Hot Yoga Benefits 
  Programs 
  Price 
  Members' Perks 
  Locate Us 
  Japanese Site 
  Copyright © LAVA Yoga Singapore. All Rights Reserved.
  pageTop

   

First Trial 
Book A Mat 

First Trial 
Book A Mat 
LAVA Yoga Singapore 
Why LAVA? 
Hot Yoga Benefits 
Programs 
Price 
Members' Perks 
Locate Us 
First Trial 
Book A Mat 
LAVA Yoga Singapore 
Hot Yoga Benefits 
Hot Yoga Benefits
Benefits of Hot Yoga for Modern Women 
Benefits to the Body, Mind & Soul
When metabolism is increased in a "hot" environment,
there is a positive impact on the body
Boost the
metabolism!
Sweat out
& detox!
Aids in weight loss, pelvis adjustment, swelling relief, better circulation and anti-aging.
98％ of LAVA members feel the effect!
※From the survey with LAVA members (about 1,700 respondents)
6 Main Benefits of Practising Hot Yoga
 
EFFECTIVE WEIGHT LOSS
Sweating during hot yoga enhances the detox effect which helps excrete water and toxins from the body. It also increases metabolism and creates a flexible, and fit body. 
 
BLOOD CIRCULATION IMPROVEMENT
Hot yoga improves circulation and metabolism, creating a warm body. This prevents poor blood circulation that often results in cold limbs. 
 
SWELLING RELIEF
Cold temperature, lack of exercise and maintaining the same posture for long hours can cause swelling. Hot yoga improves circulation and lymph flow. 
 
SHOULDER TENSION RELEASE
Hot yoga significantly reduces shoulder stiffness by improving the position of shoulder blades and enhancing blood circulation. 
 
CONSTIPATION RELIEF
Constipation is mainly caused by stress. Hot yoga can help reduce constipation woes by relaxing the body. 
 
ANTI-AGING
Practicing yoga promotes anti-aging by enhancing lymph flow and water flow by excreting body toxins.
※Results vary in individuals
An Active Body Calms The Mind.
Let the Light, Smell and Sound Heighten your Yoga Experience
Enjoy our hot yoga classes with soothing original music composed by LAVA that boosts concentration and efficacy. We use chakra lightings in the studio. The colour changes according to the union of your asanas and the chakra healing techniques. The chakra colours reflect different frequencies of light and energy associated with each energy centre.
We also use modern underfloor heating systems, from Japan, called HINOKI FLOORING! This unique system warms our body from the inside thus improving our blood circulation - perfect for those with allergies and vein problems. Permeating a unique scent called phytoncide, this distinctive scent provides you a relaxing effect as it transports you to the calming forest, as this scent is mainly found in coniferous trees such as cypress and pine.

Experience Japan's No. 1 Hot Yoga Brand!
Book your mat now
+65-6636-1562 
Weekdays: 8am - 10pm | Weekends: 9am - 6pm

Booking is mandatory.
※Bring a litre of water bottle and wear comfortable attire! 
※Arrive 15 minutes earlier. Latecomers are not allowed to enter. 
※We provide clean yoga mats, towels, and combination lockers. 


Women-only Hot Yoga Studio In Singapore
Experience LAVA
LAVA Yoga Singapore 
Why LAVA 
Hot Yoga Benefits 
Programs 
Price 
Members' Perks 
Locate Us 
Japanese Site 
Copyright © LAVA Yoga Singapore. All Rights Reserved.
pageTop


First Trial 
Book A Mat 

First Trial 
Book A Mat 
LAVA Yoga Singapore 
Why LAVA? 
Hot Yoga Benefits 
Programs 
Price 
Members' Perks 
Locate Us 
First Trial 
Book A Mat 
LAVA Yoga Singapore 
Price 
Price
Unlimited Hot Yoga Membership Package 
Membership Packages
All membership package holders get to access our 24/7 on-demand online videos for free!
Package
Type
Price 
Trial
For first timers at Great World outlet & signature classes only
$20 (Trial fee is waived if you sign up on the same day)
Membership Package 
(1-year)
Annual* 
$2160 (Payment upfront) 
Membership package (Monthly with min. commitment)
3 months*
6 months*
12 months*
$220/month
$200/month 
$180/month 
One Month Pass
One Month Pass*
$310
Drop-in
Non-members
$40
※ All membership package holders get UNLIMITED ACCESS TO CLASSES per day, everyday! 
※ T&C apply. Please contact us for more info. 
※ For membership registration, admin fee is $150. 
※ Admin fee will be waived when you join as a member on trial day. 
※ Trial class is only available for first timers at Great World outlet/residents in Singapore. 
※ Non-residents need to purchase a drop-in pass. 
Experience Japan's No. 1 Hot Yoga Brand!
Book your mat now
+65-6636-1562 
Weekdays: 8am - 10pm | Weekends: 9am - 6pm

Booking is mandatory.
※Bring a litre of water bottle and wear comfortable attire! 
※Arrive 15 minutes earlier. Latecomers are not allowed to enter. 
※We provide clean yoga mats, towels, and combination lockers. 


Women-only Hot Yoga Studio In Singapore
Experience LAVA
LAVA Yoga Singapore 
Why LAVA 
Hot Yoga Benefits 
Programs 
Price 
Members' Perks 
Locate Us 
Japanese Site 
Copyright © LAVA Yoga Singapore. All Rights Reserved.
pageTop
  `

  const prompt = {
    role: `system`,
    content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
    The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
    AI is a well-behaved and well-mannered individual.
    AI is always friendly, kind, and inspiring, and he is e ager to provide vivid and thoughtful responses to the user.
    AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
    AI assistant is a big fan of Pinecone and Vercel.
    START CONTEXT BLOCK
    ${context}
    END OF CONTEXT BLOCK
    AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
    AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
    AI assistant will not invent anything that is not drawn directly from the context.
    `,
  }

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      prompt,
      ...messages
    ],
    temperature: 0.1,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        // userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      // await kv.zadd(`user:chat:${userId}`, {
      //   score: createdAt,
      //   member: `chat:${id}`
      // })
    }
  })

  return new StreamingTextResponse(stream)
}
