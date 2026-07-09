import { db } from '../lib/db'
import { resource } from '../lib/db/schema'

const resources = [
  {
    id: 'res_anxiety_001',
    title: 'Understanding Anxiety: Causes, Symptoms, and Coping Strategies',
    description: 'Learn what anxiety is, how it affects your body and mind, and practical ways to manage it.',
    category: 'Anxiety',
    body: `Anxiety is a natural response to stress, but when it becomes persistent and overwhelming, it can interfere with daily life. It is one of the most common mental health challenges, affecting millions of people worldwide. Understanding anxiety is the first step toward managing it effectively.

Anxiety manifests in different ways for different people. Common symptoms include a racing heart, shallow breathing, muscle tension, difficulty concentrating, irritability, and a persistent sense of dread or worry. These symptoms can range from mild to severe and may come and go or persist for long periods.

There are several effective strategies for managing anxiety. Deep breathing exercises, such as the 4-7-8 technique (inhale for 4 seconds, hold for 7, exhale for 8), can help calm your nervous system. Grounding techniques, like the 5-4-3-2-1 method (identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste), can bring you back to the present moment when anxiety feels overwhelming.

Building a consistent self-care routine is also essential. Regular exercise, adequate sleep, limiting caffeine and alcohol, and maintaining social connections all play a significant role in reducing anxiety levels. If your anxiety feels unmanageable, reaching out to a mental health professional is a sign of strength, not weakness. Therapy, particularly cognitive-behavioral therapy, has been shown to be highly effective in treating anxiety disorders.`,
  },
  {
    id: 'res_depression_001',
    title: 'Navigating Depression: A Guide to Healing and Hope',
    description: 'Understanding depression, recognizing its signs, and discovering paths toward recovery and well-being.',
    category: 'Depression',
    body: `Depression is more than just feeling sad or going through a rough patch. It is a serious mental health condition that affects how you think, feel, and handle daily activities. Depression can make even simple tasks feel exhausting and can rob you of interest in things you once enjoyed.

Common signs of depression include persistent feelings of sadness, emptiness, or hopelessness, loss of interest in hobbies and activities, changes in appetite or weight, sleep disturbances (either insomnia or sleeping too much), low energy, difficulty concentrating, and thoughts of self-harm or suicide. If you experience several of these symptoms for more than two weeks, it may be time to seek help.

Recovery from depression is possible, and there are many paths to healing. Professional support through therapy, medication, or a combination of both has helped countless people regain their quality of life. Cognitive-behavioral therapy and interpersonal therapy are two evidence-based approaches that can be particularly effective.

Small daily actions can also support your recovery journey. Setting tiny, achievable goals (like making your bed or taking a short walk), maintaining a regular sleep schedule, eating nourishing foods, and staying connected with trusted friends or family members can make a meaningful difference. Remember that healing is not linear — there will be good days and difficult days, and that is okay. Be patient and kind to yourself as you navigate this journey.`,
  },
  {
    id: 'res_stress_001',
    title: 'Mastering Stress: Techniques for a Calmer Mind',
    description: 'Practical strategies to understand, reduce, and manage stress in your everyday life.',
    category: 'Stress Management',
    body: `Stress is an unavoidable part of life, but how we respond to it makes all the difference. While short-term stress can actually be motivating, chronic stress takes a serious toll on both mental and physical health. Learning to manage stress effectively is one of the most valuable skills you can develop.

When you encounter a stressful situation, your body releases hormones like cortisol and adrenaline, preparing you for a fight-or-flight response. This was useful for our ancestors facing physical threats, but modern stressors — deadlines, financial pressure, relationship conflicts — trigger the same response without allowing your body to return to a relaxed state.

Creating a personal stress management toolkit can help you respond to stress more effectively. Physical activity is one of the most powerful stress relievers, as it burns off stress hormones and releases endorphins. Even a 15-minute walk can shift your mental state. Mindfulness and meditation practices help you stay grounded in the present moment rather than worrying about the future.

Time management is another critical tool. Breaking large tasks into smaller steps, setting realistic priorities, and learning to say no to non-essential commitments can dramatically reduce your stress levels. Remember to schedule regular breaks and activities that bring you joy. If stress feels overwhelming, talking to a counselor can provide you with additional strategies tailored to your specific situation.`,
  },
  {
    id: 'res_trauma_001',
    title: 'Healing from Trauma: Your Path to Recovery',
    description: 'Understanding trauma responses and discovering gentle, effective ways to heal and reclaim your life.',
    category: 'Trauma/PTSD',
    body: `Trauma is a deeply distressing or disturbing experience that can leave lasting imprints on your mind and body. It is not the event itself that defines trauma, but how your nervous system responds to it. Trauma can result from a single incident or from prolonged exposure to stressful situations, and everyone's experience of trauma is unique.

Common reactions to trauma include flashbacks, nightmares, hypervigilance, avoidance of reminders, emotional numbness, difficulty trusting others, and physical symptoms like headaches or digestive issues. These responses are your brain's way of trying to protect you, but when they persist, they can interfere with your ability to live fully.

Healing from trauma is possible, and it is a journey that requires patience and self-compassion. Professional support is often essential — therapies like EMDR (Eye Movement Desensitization and Reprocessing), trauma-focused cognitive-behavioral therapy, and somatic experiencing have helped many people process traumatic memories and reduce their impact.

Creating safety in your body and environment is a crucial first step. This might mean establishing a calming bedtime routine, identifying safe spaces in your home, developing a list of grounding techniques that work for you, and surrounding yourself with people who respect your boundaries and healing process. Trauma recovery is not about forgetting what happened — it is about integrating the experience so that it no longer controls your present. Take each step at your own pace, and celebrate every small victory along the way.`,
  },
  {
    id: 'res_relationships_001',
    title: 'Building Healthy Relationships: Communication and Boundaries',
    description: 'Learn the foundations of strong relationships through effective communication and healthy boundaries.',
    category: 'Relationships',
    body: `Healthy relationships are built on a foundation of mutual respect, trust, and open communication. Whether with a partner, family member, friend, or colleague, the quality of our relationships significantly impacts our overall well-being and happiness.

Effective communication is the cornerstone of any strong relationship. This means expressing your thoughts and feelings clearly and honestly while also being willing to listen actively to the other person. Active listening involves giving your full attention, acknowledging what the other person says without interrupting, and reflecting back what you have heard to ensure understanding.

Setting and respecting boundaries is equally important. Boundaries are the limits and guidelines you establish to protect your emotional and physical well-being. They might include how much time you spend with someone, what topics you are comfortable discussing, or what behaviors you find acceptable. Healthy boundaries are not walls — they are guidelines that allow relationships to flourish by ensuring both people feel safe and respected.

Conflict is a normal part of any relationship. The goal is not to avoid conflict entirely but to handle it constructively. Focus on the specific issue at hand rather than attacking the person, use "I" statements to express your feelings (e.g., "I feel hurt when..."), and be willing to compromise. If conflicts feel persistently destructive, couples or family therapy can provide tools to improve communication and deepen your connection.`,
  },
  {
    id: 'res_grief_001',
    title: 'Coping with Grief: Finding Your Way Through Loss',
    description: 'Understanding the grieving process and discovering ways to navigate loss with compassion and resilience.',
    category: 'Grief/Loss',
    body: `Grief is a natural and universal response to loss. While we often associate grief with the death of a loved one, it can also arise from other losses — the end of a relationship, losing a job, moving away from home, or any significant change that leaves a void in our lives. There is no right or wrong way to grieve, and no set timeline for how long it should last.

The experience of grief is different for everyone. You might feel sadness, anger, guilt, numbness, or even relief. These emotions can come in waves and may be triggered unexpectedly by a memory, a smell, or a special date. Some people find comfort in talking about their loss, while others prefer solitude. Honor whatever you are feeling without judgment.

Supporting yourself through grief requires patience and self-compassion. Allow yourself to feel your emotions without trying to rush through them. Find small ways to take care of your basic needs — eating regularly, getting fresh air, and maintaining a basic routine can provide a sense of stability when everything feels uncertain. Connecting with others who have experienced similar losses, whether through support groups or trusted friends, can help you feel less alone.

Over time, the intensity of grief usually softens. This does not mean you have forgotten or moved on from your loss — it means you have learned to carry it differently. Many people find meaning by creating rituals to honor what they have lost, whether through journaling, creating art, volunteering, or simply setting aside quiet time to remember. If grief feels overwhelming or you find yourself stuck in intense pain for an extended period, seeking support from a grief counselor can be immensely helpful.`,
  },
  {
    id: 'res_selfesteem_001',
    title: 'Building Self-Esteem: Embracing Your Worth',
    description: 'Practical steps to develop a healthier self-image and cultivate lasting self-worth.',
    category: 'Self-Esteem',
    body: `Self-esteem is your overall sense of your own worth and value as a person. When your self-esteem is healthy, you are able to acknowledge both your strengths and weaknesses without letting either define you. Low self-esteem, on the other hand, can hold you back from pursuing opportunities, forming healthy relationships, and living a fulfilling life.

Low self-esteem often stems from negative experiences and messages received during childhood, but it can also be reinforced by current circumstances, comparisons to others, and the voices of criticism we internalize over time. Common signs of low self-esteem include a persistent fear of failure, difficulty accepting compliments, people-pleasing behavior, and a harsh inner critic that magnifies mistakes while minimizing achievements.

Building healthier self-esteem is a gradual process that begins with awareness. Start by noticing the stories you tell yourself about who you are. When you hear that critical inner voice, ask yourself: Would I speak to a friend this way? Practice replacing self-critical thoughts with more balanced, compassionate ones. This is not about false positivity but about developing a more realistic and kind perspective on yourself.

Take concrete actions that reinforce your sense of capability and worth. Set small goals and follow through on them. Learn a new skill. Help someone else. Each time you act in alignment with your values, you send a powerful message to yourself that you matter. Surround yourself with people who uplift and support you, and limit time with those who diminish you. Remember that your worth is not something you need to earn — it is inherent, and it is yours.`,
  },
  {
    id: 'res_transitions_001',
    title: 'Navigating Life Transitions: Embracing Change',
    description: 'Strategies to cope with major life changes and grow through periods of transition.',
    category: 'Life Transitions',
    body: `Life is full of transitions — some expected, like graduating, starting a new job, or becoming a parent, and others unexpected, like a sudden loss, illness, or an unforeseen career change. Even positive transitions can be accompanied by stress, uncertainty, and a sense of disorientation as you leave the familiar behind and step into the unknown.

During periods of transition, it is normal to experience a wide range of emotions. You might feel excitement and anticipation alongside fear and grief for what you are leaving behind. This mixture of feelings can be confusing, but it is a natural part of the change process. Allow yourself to feel all of it without judging yourself for having conflicting emotions.

Creating structure during times of change can provide a sense of stability and control. Maintain consistent routines around sleep, meals, and exercise as much as possible. Identify a few anchors in your day — small rituals or activities that remain constant regardless of what else is changing. These anchors can be as simple as a morning cup of tea, a daily walk, or an evening gratitude practice.

Transitions also offer opportunities for growth and self-discovery. Take time to reflect on what you want your new chapter to look like. What have you learned from your past experiences? What values do you want to carry forward? What do you want to leave behind? Journaling, talking with trusted friends, or working with a counselor can help you process the transition and emerge with greater clarity and resilience. Remember that discomfort is temporary, and every ending makes space for a new beginning.`,
  },
  {
    id: 'res_addiction_001',
    title: 'Understanding Addiction: Recovery and Support',
    description: 'Learning about addiction as a health condition and exploring paths toward recovery and healing.',
    category: 'Addiction',
    body: `Addiction is a complex condition characterized by compulsive substance use or behavior despite harmful consequences. It is important to understand that addiction is not a moral failing or a lack of willpower — it is a brain disorder that affects the way your brain processes reward, motivation, and memory. Recognizing addiction as a health condition rather than a character flaw is a crucial step toward effective treatment and recovery.

The development of addiction typically follows a pattern. What begins as voluntary use or behavior gradually becomes compulsive as the brain's reward system adapts. Over time, you may need more of the substance or behavior to achieve the same effect, and you may experience withdrawal symptoms when you try to stop. This cycle can feel impossible to break alone, but recovery is absolutely possible with the right support.

Treatment for addiction looks different for everyone. Some people benefit from medically supervised detoxification followed by inpatient or outpatient rehabilitation programs. Others find peer support groups like Alcoholics Anonymous or SMART Recovery to be essential components of their recovery. Therapy, particularly cognitive-behavioral therapy, can help identify and change the thought patterns and behaviors that contribute to addiction.

Recovery is a lifelong journey, not a destination. It often involves multiple attempts and setbacks, and that is perfectly normal. What matters is continuing to reach out for support and recommitting to your goals. If you or someone you care about is struggling with addiction, please know that help is available. Speaking with a healthcare provider, calling a helpline, or attending a support group meeting can be the first step toward a healthier, more fulfilling life in recovery.`,
  },
  {
    id: 'res_eating_001',
    title: 'Healing Your Relationship with Food and Body',
    description: 'Understanding eating disorders and developing a healthier, more compassionate relationship with food and your body.',
    category: 'Eating Disorders',
    body: `Eating disorders are serious mental health conditions that affect a person's relationship with food, body image, and overall well-being. They include anorexia nervosa, bulimia nervosa, binge eating disorder, and other specified feeding or eating disorders. These conditions can affect anyone regardless of age, gender, or background, and they are not a choice or a lifestyle — they are complex illnesses that require professional care.

The causes of eating disorders are multifaceted, involving genetic, biological, psychological, and sociocultural factors. Cultural pressures to achieve a certain body type, perfectionism, trauma, and difficulties with emotional regulation can all contribute to the development of disordered eating patterns. Recognizing these underlying factors is essential for meaningful recovery.

Recovery from an eating disorder is possible, and it typically involves a multidisciplinary approach. Medical professionals monitor physical health, while therapists help address the psychological aspects of the disorder. Nutritional counseling can help rebuild a healthy relationship with food, and support groups provide connection with others who understand what you are going through. Intuitive eating — learning to trust your body's hunger and fullness cues without judgment — is one approach that many find helpful in recovery.

If you are struggling with an eating disorder, reaching out for help is the most important step you can take. Talk to a trusted healthcare provider who can connect you with specialized treatment. Remember that you deserve to have a peaceful relationship with food and your body. Healing is not about achieving a certain size or shape — it is about freedom from the constant preoccupation with food and appearance, and reclaiming the energy and attention that your eating disorder has been consuming. You are worthy of that freedom.`,
  },
]

async function main() {
  console.log('Seeding resources...')
  for (const r of resources) {
    await db.insert(resource).values({
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category,
      body: r.body,
    }).onConflictDoNothing()
    console.log(`  ✓ ${r.title}`)
  }
  console.log(`\nDone! ${resources.length} resources seeded.`)
}

main().catch(console.error)
