import { Question } from './IMessageQuestion';

const messageQustions: Question[] = [
  {
    id: 1,
    text: 'Hello! How are you feeling today? It’s cool to be real here, no filters needed.',
    answers: [
      { text: "I'm feeling good today.", next: 2 },
      { text: "I'm doing okay, not the best.", next: 3 },
      { text: "Honestly, I'm struggling today.", next: 4 },
    ],
  },
  {
    id: 2,
    text: "Awesome! What's something fun you did today that got you in a good mood?",
    answers: [
      { text: 'Just crushed my workout.', next: 13 },
      { text: 'Hung out with some friends.', next: 13 },
      { text: 'Caught up on my favorite series.', next: 13 },
    ],
  },
  {
    id: 3,
    text: 'Gotcha. Is it something specific, or just one of those days?',
    answers: [
      { text: "Yeah, something's up. Mind if I share?", next: 5 },
      { text: 'Just one of those days, man.', next: 14 },
    ],
  },
  {
    id: 4,
    text: "I'm all ears, buddy. What’s eating at you?",
    answers: [
      { text: 'I think I need to vent a bit.', next: 6 },
      { text: 'Not sure I want to dive into it just yet.', next: 14 },
    ],
  },
  {
    id: 5,
    text: 'Shoot, I’m here. What’s going on?',
    answers: [
      { text: 'Life’s been insane lately.', next: 7 },
      { text: 'Some personal stuff is getting to me.', next: 8 },
      { text: 'Feeling a bit isolated lately.', next: 9 },
    ],
  },
  {
    id: 6,
    text: "Let's unpack it together. What's on your mind?",
    answers: [
      { text: 'Just super stressed with everything.', next: 7 },
      { text: 'Feeling anxious about some stuff.', next: 8 },
      { text: 'I’m just really down, you know?', next: 9 },
    ],
  },
  {
    id: 7,
    text: 'Stress can be a real workout for your brain, huh? What’s the main stressor for you right now?',
    answers: [
      { text: "It's my job or school, basically.", next: 10 },
      { text: 'Relationship drama, sadly.', next: 10 },
      { text: "It's like a combo meal of stress, everything’s in there.", next: 10 },
    ],
  },
  {
    id: 8,
    text: "Anxiety's like that weird alarm that goes off without a snooze button. What sets it off for you?",
    answers: [
      { text: 'Certain places or events freak me out.', next: 10 },
      { text: 'It’s mostly around people.', next: 10 },
      { text: 'Honestly, it just comes and goes.', next: 10 },
    ],
  },
  {
    id: 9,
    text: "Depression's tough, like a shadow that follows you. Have you talked to someone who could professionally help?",
    answers: [
      { text: 'Yes, I have a therapist.', next: 10 },
      { text: 'Not yet, still trying to find someone.', next: 11 },
    ],
  },
  {
    id: 10,
    text: "It's good to get that off your chest. Want to brainstorm some ways to lighten that load or keep chatting?",
    answers: [
      { text: 'Yeah, let’s talk strategies.', next: 15 },
      { text: 'Just venting helped, thanks.', next: 16 },
    ],
  },
  {
    id: 11,
    text: 'It can be a jungle out there finding the right help. Want some pointers on where to look for a good therapist or support group?',
    answers: [
      { text: 'Yes, that’d be great.', next: 12 },
      { text: 'I’ll look on my own for now.', next: 16 },
    ],
  },
  {
    id: 12,
    text: 'Here’s a list of resources and some cool apps that might help. Sometimes just downloading an app feels like you’re taking action, you know?',
    answers: [
      { text: 'I’ll check them out, thanks!', next: 16 },
      { text: 'Got anything else?', next: 12 },
    ],
  },
  {
    id: 13,
    text: 'Nice! Keeping active or chilling with friends can really boost your spirits. Wanna keep up the good vibes or explore something new?',
    answers: [
      { text: 'Keep the good times rolling.', next: 16 },
      { text: 'Hit me with something new.', next: 17 },
    ],
  },
  {
    id: 14,
    text: "No pressure, bro. Whenever you’re ready to talk, I'm here. Taking it easy is also a way of coping.",
    answers: [
      { text: 'Maybe I’ll open up later. Thanks, man.', next: 1 },
      { text: 'Appreciate it. Catch you later.', next: null },
    ],
  },
  {
    id: 15,
    text: 'Cool, let’s dive into some tactics. You into trying out some sports, gaming, or maybe some mindfulness exercises?',
    answers: [
      { text: 'Sports could be fun.', next: 19 },
      { text: "I'm all about gaming.", next: 20 },
      { text: 'Mindfulness sounds intriguing.', next: 18 },
    ],
  },
  {
    id: 16,
    text: "Always good chatting with you. Remember, I'm just a few taps away if you ever want to talk again. Take care!",
    answers: [
      { text: 'Thanks, will do!', next: null },
      { text: 'Sure thing, see ya!', next: null },
    ],
  },
  {
    id: 17,
    text: 'Spicing things up can be the ticket! How about trying some new hobbies like photography, cooking, or even drone flying?',
    answers: [
      { text: 'Photography sounds cool.', next: 46 },
      { text: 'Cooking could be tasty.', next: 49 },
      { text: 'Drone flying? Now you’re talking!', next: 57 },
    ],
  },
  {
    id: 18,
    text: 'Mindfulness is like giving your mind a chill pill. Interested in learning a quick breathing exercise or maybe some yoga?',
    answers: [
      { text: 'Teach me a breathing technique.', next: 58 },
      { text: 'Yoga? Let’s stretch it out.', next: 59 },
    ],
  },
  {
    id: 19,
    text: 'Hitting a ball can be a great way to release stress. Maybe tennis, basketball, or even golf? What’s your pick?',
    answers: [
      { text: 'Tennis sounds fun.', next: 60 },
      { text: 'Basketball for the win.', next: 61 },
      { text: "Golf? Let's hit the greens.", next: 62 },
    ],
  },
  {
    id: 20,
    text: 'Gaming is like a mini-vacation from stress. Into console games, PC games, or VR?',
    answers: [
      { text: 'Console games are my jam.', next: 63 },
      { text: 'PC master race here.', next: 64 },
      { text: 'VR sounds wild, let’s try that.', next: 65 },
    ],
  },
  {
    id: 21,
    text: 'Meditation can help you focus and calm your mind. It’s like giving your brain a spa day! Interested in how to get started?',
    answers: [
      { text: 'Yes, show me the basics.', next: 24 },
      { text: 'Maybe later, thanks.', next: 16 },
    ],
  },
  {
    id: 22,
    text: 'Guided imagery involves using your imagination to visualize a peaceful setting or scenario. It’s like a mental vacation! Want to try a short session?',
    answers: [
      { text: "Yes, let's take that mental vacation.", next: 25 },
      { text: 'Not right now, but sounds interesting.', next: 16 },
    ],
  },
  {
    id: 23,
    text: 'Cognitive-behavioral techniques involve changing negative thoughts and behaviors into positive ones. Think of it as teaching your brain new tricks. Interested?',
    answers: [
      { text: 'Yes, teach me these tricks.', next: 26 },
      { text: "I'll consider it for later.", next: 16 },
    ],
  },
  {
    id: 24,
    text: 'Great! Start by finding a quiet place where you won’t be disturbed. Focus on your breathing, and try to clear your mind. How does that feel?',
    answers: [
      { text: 'Pretty relaxing, actually.', next: 16 },
      { text: "It's harder than I thought!", next: 27 },
    ],
  },
  {
    id: 25,
    text: 'Imagine you’re on a beach. The sun is setting, and you can hear the waves crashing gently. Take deep breaths and let the scene relax you. Feeling more relaxed?',
    answers: [
      { text: 'Yes, that was soothing.', next: 16 },
      { text: "I'm trying, but it's a bit difficult.", next: 28 },
    ],
  },
  {
    id: 26,
    text: 'Start by identifying a negative thought. Now, challenge it: Is it true? Can you look at it differently? Practice this daily. How do you feel about trying this?',
    answers: [
      { text: "I think it could help, I'll try it.", next: 16 },
      { text: 'Sounds a bit complicated, but I’m willing to learn more.', next: 29 },
    ],
  },
  {
    id: 27,
    text: 'No worries, it takes practice. Like learning to ride a bike, but less falling over. Want to try a guided exercise instead?',
    answers: [
      { text: "Sure, let's try that.", next: 22 },
      { text: 'Maybe another time.', next: 16 },
    ],
  },
  {
    id: 28,
    text: 'It’s okay, not everyone gets it on the first try. It’s like being bad at karaoke—it’s all about having fun trying. Want some tips on how to improve?',
    answers: [
      { text: 'Yes, please give me some tips.', next: 30 },
      { text: "I think I'll practice on my own for now.", next: 16 },
    ],
  },
  {
    id: 29,
    text: 'Let’s break it down more. Think of it as a game where each level up is a happier thought. Want to go through an example together?',
    answers: [
      { text: 'Yes, that sounds fun!', next: 31 },
      { text: 'Maybe later, I need to think about it.', next: 16 },
    ],
  },
  {
    id: 30,
    text: 'Focus on one sense at a time. What do you smell? What do you hear? This can help anchor you in the scene. Ready to try again?',
    answers: [
      { text: 'Okay, let’s go for it.', next: 25 },
      { text: 'I’ll give it another shot later.', next: 16 },
    ],
  },
  {
    id: 31,
    text: 'Imagine you think you’re bad at math. Challenge that: Maybe you haven’t found the right teacher yet. Or maybe, math is just a sneaky puzzle waiting to be solved!',
    answers: [
      { text: 'Interesting way to look at it, thanks!', next: 16 },
      { text: "I'll need to think about that.", next: 16 },
    ],
  },
  {
    id: 32,
    text: "Sports are a great way to clear your mind and get that energy flowing. Ever tried hitting a punching bag? It's like a stress ball, but more badass.",
    answers: [
      { text: 'Yeah, it sounds like a good stress relief!', next: 16 },
      { text: 'Not really my thing, got anything else?', next: 33 },
    ],
  },
  {
    id: 33,
    text: "No worries, everyone's got their vibe. How about we switch gears? Ever thought about writing or journaling? It’s like texting but the autocorrect is your brain.",
    answers: [
      { text: 'Could be cool, tell me more.', next: 34 },
      { text: "I'm not much of a writer.", next: 35 },
    ],
  },
  {
    id: 34,
    text: "Journaling can help you unpack your thoughts and track your wins, no matter how small. It's like keeping score in a game, but the points are your personal insights.",
    answers: [
      { text: "I'll give it a shot, thanks for the tip!", next: 16 },
      { text: 'Sounds good, any tips on how to start?', next: 36 },
    ],
  },
  {
    id: 35,
    text: "Totally get it, writing isn't for everyone. Maybe a quick fix like playing some video games? It’s like a mini-vacation from the daily grind.",
    answers: [
      { text: 'Yeah, gaming does help me unwind.', next: 16 },
      { text: "I'm trying to cut down on screen time.", next: 37 },
    ],
  },
  {
    id: 36,
    text: "Starting is as simple as 'Dear Diary, today was...'. Just kidding, start with what's on your mind or maybe something funny that happened today.",
    answers: [
      { text: "Got it, I'll start tonight!", next: 16 },
      { text: 'I’ll think about it, thanks.', next: 16 },
    ],
  },
  {
    id: 37,
    text: 'Good call on watching the screen time. How about reconnecting with nature? Even a short walk outside can boost your mood more than the best emoji.',
    answers: [
      { text: "True, I'll try to get outside more.", next: 16 },
      { text: "Weather's not great lately.", next: 38 },
    ],
  },
  {
    id: 38,
    text: "When it rains, it pours, huh? Maybe this is a good chance to try out some indoor workouts or yoga? It's like doing a weather dance, but for your wellbeing.",
    answers: [
      { text: 'Yoga at home could work.', next: 16 },
      { text: "I'll think about indoor workouts.", next: 16 },
    ],
  },
  {
    id: 39,
    text: "Great choice! Yoga isn't just about flexibility; it's about creating space where you were once stuck. Ready to try a basic pose to feel more centered?",
    answers: [
      { text: "Sure, what's the first step?", next: 40 },
      { text: 'Maybe later. What else can I do indoors?', next: 41 },
    ],
  },
  {
    id: 40,
    text: 'Start with the mountain pose. Stand tall with your feet together, hands at your side, eyes forward, and breathe deeply. It’s like becoming the hero in your own calm movie scene.',
    answers: [
      { text: 'Feels good to stretch! What’s next?', next: 42 },
      { text: "Not sure if I’m doing it right, but I'll keep trying.", next: 16 },
    ],
  },
  {
    id: 41,
    text: 'How about some strength training? You don’t need heavy weights—a couple of water bottles can serve as dumbbells. Ready to give it a try?',
    answers: [
      { text: 'Yes, show me some exercises.', next: 43 },
      { text: "I'll stick to something less intense for now.", next: 44 },
    ],
  },
  {
    id: 42,
    text: 'Awesome! Let’s move into a warrior pose. It’s about strength and focus. Step one leg back, bend your front knee, reach your arms up, and gaze ahead. Imagine conquering your stress like a battle.',
    answers: [
      { text: 'Powerful stance, I like it!', next: 16 },
      { text: 'A bit challenging, but I’ll practice.', next: 16 },
    ],
  },
  {
    id: 43,
    text: 'Let’s start with bicep curls. Hold your water bottles, arms at your sides, then curl them towards your shoulders. It’s like lifting your spirits—literally!',
    answers: [
      { text: 'Got it, this is good!', next: 16 },
      { text: 'This is harder than I thought.', next: 16 },
    ],
  },
  {
    id: 44,
    text: 'No problem! Consider some light stretching or even mindful breathing. It can be as simple as sitting comfortably and taking deep, slow breaths. Want to try a quick breathing exercise?',
    answers: [
      { text: 'Yes, let’s do some breathing.', next: 45 },
      { text: 'I’ll just relax for now, thanks.', next: 16 },
    ],
  },
  {
    id: 45,
    text: 'Great! Inhale slowly through your nose, hold for four seconds, then exhale slowly through your mouth. Repeat a few times. It’s like hitting the reset button on your nervous system.',
    answers: [
      { text: 'That really helps, thanks!', next: 16 },
      { text: 'I feel a bit calmer now.', next: 16 },
    ],
  },
  {
    id: 57,
    text: "Drone flying isn't just a thrill; it's a way to capture life from new heights. Want to learn some basic maneuvers or discuss different types of drones?",
    answers: [
      { text: "I'll go practice some basic maneuvers.", next: 16 },
      { text: "I'm going to read up on different drones.", next: 16 },
    ],
  },
  {
    id: 58,
    text: "Let's start with a simple technique called 'box breathing'. Breathe in for four counts, hold for four counts, breathe out for four counts, and hold again. Ready to give it a try?",
    answers: [
      { text: "I'll practice this to see if it helps my focus.", next: 16 },
      { text: 'I need to integrate this into my daily routine first.', next: 16 },
    ],
  },
  {
    id: 59,
    text: "Great! Let's start with a basic yoga pose called the 'Downward Dog'. It helps relieve stress and stretch your body. Want to step through it?",
    answers: [
      { text: "I'll try the Downward Dog pose to stretch a bit.", next: 16 },
      { text: "I'll explore some yoga poses later when I have more space.", next: 16 },
    ],
  },
  {
    id: 60,
    text: 'Tennis can be a great workout and stress reliever. How about we discuss some basic strokes, or would you like tips on how to serve?',
    answers: [
      { text: "I'm going to practice the basic strokes at the court.", next: 16 },
      { text: "I'll focus on improving my serve next time I play.", next: 16 },
    ],
  },
  {
    id: 61,
    text: 'Basketball is all about agility and coordination. Want to learn some dribbling drills or shooting techniques?',
    answers: [
      { text: "I'll work on my dribbling skills at the gym.", next: 16 },
      { text: 'Improving my shooting is my goal for the next game.', next: 16 },
    ],
  },
  {
    id: 62,
    text: 'Golf is a game of precision and calm. Interested in learning how to improve your swing or choosing the right club?',
    answers: [
      { text: "I'll practice my swing this weekend at the range.", next: 16 },
      { text: "I'm going to research how to choose the right clubs for my style.", next: 16 },
    ],
  },
  {
    id: 63,
    text: 'Console gaming offers a unique escape. What genre are you into?',
    answers: [
      { text: "I'll jump into some action games tonight.", next: 16 },
      { text: 'Strategy games are up next on my list to master.', next: 16 },
    ],
  },
  {
    id: 64,
    text: 'PC gaming at its best! Are you looking for game recommendations, or perhaps tips on optimizing your setup?',
    answers: [
      { text: "I'll explore some top game picks for my PC.", next: 16 },
      { text: 'Optimizing my PC setup is my project for today.', next: 16 },
    ],
  },
  {
    id: 65,
    text: 'VR can be a total game-changer. Interested in exploring virtual reality experiences or need advice on VR gear?',
    answers: [
      { text: "I'll set up my VR gear for an immersive gaming session.", next: 16 },
      { text: 'I need to get some advice on the best VR gear for my needs.', next: 16 },
    ],
  },
];

export default messageQustions;
