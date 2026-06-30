import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
})
const db = drizzle(pool)

const ARTICLES = [
  {
    title: "Understanding Anxiety",
    category: "Anxiety",
    description: "Learn about anxiety and gentle ways to find calm in everyday life.",
    body: "Anxiety is something many of us experience from time to time. It is that feeling of unease, worry, or nervousness that can arise in response to stress or uncertainty. While occasional anxiety is a normal part of life, persistent feelings of worry can begin to feel overwhelming.\n\nThe important thing to remember is that you are not alone, and there are small, steady steps you can take to create more calm in your daily life.\n\nStart by noticing when anxiety shows up without judging yourself for it. Simply acknowledging 'I am feeling anxious right now' can create a small space between you and the feeling. From there, try gentle grounding techniques: name five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste. This practice can help bring your mind back to the present moment.\n\nBreathing exercises can also be a helpful tool. Try breathing in slowly for four counts, holding for four, and breathing out for six. The longer exhale signals your nervous system to settle.\n\nRemember that support is always available. Talking with a counselor, a trusted friend, or a support group can make a meaningful difference. You deserve to feel at ease in your own life, and taking small steps toward that is a sign of strength."
  },
  {
    title: "Living with Depression",
    category: "Depression",
    description: "Understanding depression and finding moments of light, one step at a time.",
    body: "Depression can feel like a heavy fog that makes everything harder than it used to be. It is not simply sadness, but a persistent state that can drain energy, motivation, and hope. If you are experiencing depression, please know that this is not your fault and you are not alone.\n\nHealing does not happen all at once. It happens in small, gentle moments. Start with the basics: try to drink water, eat something nourishing, and step outside for even a few minutes. These tiny acts of care are not trivial, they are foundations.\n\nRoutine can be a quiet anchor. Try to wake up and go to bed at similar times each day. Set one small intention each morning, something as simple as 'I will sit by the window for five minutes' or 'I will text a friend today.'\n\nMovement, even gentle stretching or a short walk, can help lift mood over time. You do not need to do it perfectly, just showing up for yourself matters.\n\nMost importantly, please reach out for support. Depression responds well to conversation and connection. Counselors are here to listen without judgment and walk alongside you at your own pace. You are worthy of support and care."
  },
  {
    title: "Finding Balance with Stress Management",
    category: "Stress Management",
    description: "Simple, supportive ways to navigate the demands of daily life with more ease.",
    body: "Stress is a natural response to the demands of life. In small doses, it can help us stay focused and motivated. But when stress becomes chronic, it can leave us feeling exhausted, irritable, and overwhelmed.\n\nThe goal is not to eliminate stress completely, but to build a healthier relationship with it. Here are some supportive approaches to consider.\n\nFirst, identify your stressors. Take a few quiet moments to notice what situations trigger stress for you. Writing them down can help you see patterns and prepare for them with more awareness.\n\nSet boundaries that protect your energy. It is okay to say no to commitments that drain you. It is okay to ask for help. Prioritizing your well-being is not selfish, it is necessary.\n\nBuild small resets into your day. A five-minute break to stretch, breathe deeply, or step outside can make a real difference. Think of these as mini-resets for your nervous system.\n\nConnect with others. Talking about what stresses you can lighten the load. Whether it is a friend, family member, or counselor, sharing your experience reminds you that you do not have to carry everything alone.\n\nBe patient and kind with yourself. You are doing the best you can with what you have, and that is enough."
  },
  {
    title: "Healing After Trauma",
    category: "Trauma/PTSD",
    description: "A gentle guide to understanding trauma and the path toward healing at your own pace.",
    body: "Trauma can leave lasting imprints on our minds and bodies. Whether it stems from a single event or prolonged experiences, the effects are real and valid. Healing from trauma is not a straight line, and it looks different for everyone.\n\nThe first and most important step is creating safety, both physically and emotionally. This means being in environments and with people who respect your boundaries and make you feel secure. You have the right to feel safe.\n\nYour body holds onto trauma in its own ways. You might notice tension, fatigue, or a heightened startle response. Gentle practices like slow breathing, progressive muscle relaxation, or simply placing a hand on your heart can help your nervous system begin to settle.\n\nYou do not need to retell your story all at once. Healing happens in layers, at your own pace. It is okay to set aside memories that feel too heavy and return to them when you feel ready, if ever.\n\nProfessional support from a trauma-informed counselor can be deeply helpful. They can offer tools and a safe space to process at a pace that feels right for you. You do not have to heal alone, and reaching out is a courageous step forward."
  },
  {
    title: "Nurturing Healthy Relationships",
    category: "Relationships",
    description: "Building connections that honor your needs and the needs of those you care about.",
    body: "Relationships are at the heart of a meaningful life. Whether with partners, family, friends, or colleagues, the connections we share can be sources of joy, support, and growth. Yet relationships also require care and attention to thrive.\n\nCommunication is the foundation. Try to express your needs openly and honestly, using 'I feel' statements to share your experience without blame. For example, 'I feel overlooked when plans change without notice' invites understanding rather than defensiveness.\n\nListening is just as important. When someone you care about is speaking, try to listen fully without planning your response. Reflect back what you hear: 'It sounds like you are feeling...' This simple practice builds trust and understanding.\n\nBoundaries are essential for healthy relationships. It is okay to say no, to ask for space, and to express what you need. Healthy boundaries are not walls, they are guidelines that help relationships be sustainable and respectful.\n\nConflict is natural. When disagreements arise, aim for connection rather than winning. Take breaks if emotions run high, and return to the conversation when both people feel calmer.\n\nRemember that you deserve relationships where you feel seen, heard, and valued."
  },
  {
    title: "Navigating Grief and Loss",
    category: "Grief/Loss",
    description: "Understanding grief as a natural, personal journey and finding ways to carry loss with compassion.",
    body: "Grief is a natural response to loss. It can come from the death of a loved one, the end of a relationship, a major life change, or any significant loss. There is no right or wrong way to grieve, and there is no set timeline.\n\nGrief often comes in waves. Some days may feel manageable, while others hit hard unexpectedly. This is normal. Allow yourself to feel whatever arises, sadness, anger, numbness, or even moments of peace. All of these feelings are valid.\n\nYou do not have to grieve alone. Connecting with others who understand your loss can be deeply comforting. Whether through support groups, trusted friends, or a counselor, sharing your experience can lighten the weight.\n\nFinding small ways to honor what you have lost can be healing. This might mean creating a memory box, writing a letter, lighting a candle, or simply speaking their name aloud. These rituals acknowledge that the bond continues even in absence.\n\nBe gentle with yourself. Grief is exhausting, both emotionally and physically. Rest when you need to, eat what you can, and let go of expectations about how you 'should' be feeling. Your grief is uniquely yours, and it deserves patience and compassion."
  },
  {
    title: "Building Self-Esteem",
    category: "Self-Esteem",
    description: "Quietly strengthening your relationship with yourself through small, meaningful practices.",
    body: "Self-esteem is the way we see and value ourselves. It is not about being better than others or achieving more, it is about recognizing your inherent worth as a person. If your inner voice is harsh or critical, know that you can gently reshape that relationship over time.\n\nStart by noticing your inner dialogue. When you notice self-critical thoughts, try softening them. Instead of 'I am not good enough,' try 'I am doing my best, and that is enough.' This is not about false positivity, it is about treating yourself with the same kindness you would offer a friend.\n\nCelebrate small wins. Did you get out of bed today? Did you complete a task you had been putting off? Did you reach out to someone? These all count. Acknowledging your efforts builds momentum and self-trust.\n\nSurround yourself with people who lift you up. The company you keep shapes how you see yourself. Seek relationships that feel affirming and respectful.\n\nTry something new, even if you might not be good at it at first. Learning a new skill or hobby, without pressure to excel, can remind you that growth is about the journey, not perfection.\n\nYou are worthy of love and respect, including from yourself. Building self-esteem is a gentle, ongoing practice, and every small step matters."
  },
  {
    title: "Navigating Life Transitions",
    category: "Life Transitions",
    description: "Finding your footing during times of change with patience, self-compassion, and support.",
    body: "Life is full of transitions, some chosen and some unexpected. Whether it is starting a new job, moving to a new place, ending a relationship, becoming a parent, or any significant change, transitions can bring a mix of excitement, uncertainty, and stress.\n\nFirst, give yourself permission to feel all of it. It is normal to feel both hopeful and scared, ready and unsure. You do not have to have it all figured out. Transition is a process, not a single moment.\n\nCreate small anchors of stability. During times of change, routines can be grounding. Try to keep consistent sleep and meal times, maintain a simple morning ritual, or set aside time each day for something that brings you comfort, like reading, walking, or listening to music.\n\nGive yourself time to adjust. Major life changes take time to integrate. Be patient with yourself if you feel disoriented or uncertain. This is a natural part of the process.\n\nSeek connection. Talking with others who have been through similar transitions can provide perspective and reassurance. You do not have to navigate change alone.\n\nRemember that transitions, even difficult ones, can open doors to new growth and understanding. You have navigated change before, and you have the strength to navigate this too."
  },
  {
    title: "Understanding Addiction with Compassion",
    category: "Addiction",
    description: "A supportive look at addiction, recovery, and the courage it takes to seek change.",
    body: "Addiction is a complex experience that affects millions of people. It is not a moral failing or a lack of willpower, it is a condition that deserves understanding and compassionate support. If you are struggling with addiction, please know that you are not alone and that help is available.\n\nRecovery is not about perfection. It is about progress, one step at a time. If you have a setback, that does not erase the steps you have already taken. Each day is a new opportunity to choose care for yourself.\n\nBuilding a support system is one of the most powerful things you can do. This might include trusted friends, family members, support groups, or a counselor who specializes in addiction. Connection reduces shame and reminds you that you are more than your struggles.\n\nFind healthy coping strategies that work for you, whether that is exercise, creative expression, meditation, or spending time in nature. These activities can fill some of the space that addiction has occupied.\n\nProfessional support can make a profound difference. Counselors can help you understand the underlying causes of addiction and develop strategies that honor your unique journey. You deserve support, and reaching out is an act of courage and self-compassion."
  },
  {
    title: "Finding Peace with Food and Body Image",
    category: "Eating Disorders",
    description: "Moving toward a kinder relationship with food, your body, and yourself.",
    body: "Our relationship with food and our bodies is deeply personal and can be shaped by many factors, including culture, family, and life experiences. If you struggle with disordered eating or negative body image, please know that healing is possible and you deserve support.\n\nThe journey begins with separating your worth from your appearance. Your value as a person has nothing to do with what you look like or what you eat. Challenge the idea that your body needs to be 'fixed.' Instead, consider what your body does for you, it carries you through each day, and it deserves care and respect.\n\nTry to move away from rigid food rules. Restriction often leads to cycles of control and loss of control. Instead, aim for gentle nourishment: eating regularly, including foods that feel good and satisfy you, and giving yourself permission to enjoy food without guilt.\n\nNotice the language you use about food and your body. Try replacing judgmental statements with neutral or kind ones. Instead of 'I was bad for eating that,' try 'I ate that and enjoyed it, and that is okay.'\n\nProfessional support is especially important for eating disorders. Counselors who specialize in this area can help you untangle the complex feelings around food and body image in a safe, nonjudgmental space. You deserve to feel at peace with yourself, and reaching out for help is a powerful step toward that peace."
  },
]

async function main() {
  console.log(`Seeding ${ARTICLES.length} resources...`)

  for (const article of ARTICLES) {
    await pool.query(
      `INSERT INTO "resource" ("id", "title", "description", "category", "body")
       VALUES ($1, $2, $3, $4, $5)`,
      [
        `res_seed_${article.category.toLowerCase().replace(/[^a-z]/g, "_")}`,
        article.title,
        article.description,
        article.category,
        article.body,
      ]
    )
    console.log(`  ✓ ${article.title}`)
  }

  console.log("Done!")
  await pool.end()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
