// This file contains all the mock data for the prototype widgets.


export const mockData = {
  teacher: {
    earlyIntervention: [
      { id: 1, name: 'Alex Johnson', reason: 'Low quiz scores in Module 3', avatar: 'A', status: 'error' },
      { id: 2, name: 'Maria Garcia', reason: 'Decreased engagement this week', avatar: 'M', status: 'warning' },
      { id: 3, name: 'Chen Wei', reason: 'Late submission on key assignment', avatar: 'C', status: 'info' },
    ],
    classPerformance: [
      { name: 'A', value: 8 }, { name: 'B', value: 15 }, { name: 'C', value: 6 }, { name: 'D', value: 2 },
    ],
    gradingQueue: [
      { id: 1, title: 'Physics Lab Report', class: 'Grade 11 Physics', count: 5 },
      { id: 2, title: 'History Essay', class: 'Grade 10 History', count: 12 },
    ],
    conversations: [
        { id: 1, name: 'Alex Johnson', type: 'Student', avatar: 'A', lastMessage: 'Great! Before we dive into details...', time: '8 hours', unread: 2, messages: [
            { from: 'student', text: 'Hi! I\'m having trouble with the vectors assignment, specifically question 3.' },
            { from: 'teacher', text: 'Of course, Alex. Can you show me what you\'ve tried so far?' },
        ]},
        { id: 2, name: 'Maria Garcia', type: 'Parent', avatar: 'M', lastMessage: 'I\'m thrilled to dive into our possibilities.', time: '1 day', unread: 0, messages: [
            { from: 'parent', text: 'Hello, I was hoping to schedule a brief meeting to discuss Maria\'s progress.' },
            { from: 'teacher', text: 'Hi Mrs. Garcia, absolutely. I\'m available tomorrow afternoon or Friday morning.' },
        ]},
        { id: 3, name: 'Liam K.', type: 'Student', avatar: 'L', lastMessage: 'Hope you\'re doing well! Just checking in...', time: '2 days', unread: 1, messages: [] },
    ],
    // THE FIX IS HERE: The analytics object is now correctly placed within the teacher object.
    analytics: {
      students: [
        { id: 1, name: 'Alex Johnson', avgGrade: 82, completion: 90, engagement: 75 },
        { id: 2, name: 'Maria Garcia', avgGrade: 95, completion: 100, engagement: 92 },
        { id: 3, name: 'Chen Wei', avgGrade: 88, completion: 95, engagement: 85 },
        { id: 4, name: 'Liam K.', avgGrade: 76, completion: 80, engagement: 60 },
        { id: 5, name: 'Olivia R.', avgGrade: 91, completion: 100, engagement: 88 },
        { id: 6, name: 'Noah J.', avgGrade: 68, completion: 70, engagement: 45 },
      ],
      scoreTrends: [
        { module: 'Mod 1', averageScore: 85 },
        { module: 'Mod 2', averageScore: 91 },
        { module: 'Mod 3', averageScore: 78 },
        { module: 'Mod 4', averageScore: 88 },
      ],
      strugglingTopics: [
        { topic: 'Vectors', struggleRate: 45 },
        { topic: 'Thermodynamics', struggleRate: 30 },
        { topic: 'Essay Structure', struggleRate: 25 },
        { topic: 'Algebra', struggleRate: 15 },
      ],
      engagementDistribution: [
        { name: 'High', value: 9, color: '#82ca9d' },
        { name: 'Medium', value: 12, color: '#8884d8' },
        { name: 'Low', value: 4, color: '#ffc658' },
      ]
    }
  },
  student: {
    kpis: {
      coursesInProgress: 4,
      assignmentsDue: 3,
      overallProgress: 78,
    },
    weeklyActivity: [
      { day: 'Mon', hours: 1.5 },
      { day: 'Tue', hours: 2.0 },
      { day: 'Wed', hours: 1.0 },
      { day: 'Thu', hours: 3.0 },
      { day: 'Fri', hours: 0.5 },
      { day: 'Sat', hours: 4.0 },
      { day: 'Sun', hours: 2.5 },
    ],
    recentScores: [
      { assignment: 'HW 1', score: 85 },
      { assignment: 'Quiz 1', score: 92 },
      { assignment: 'HW 2', score: 78 },
      { assignment: 'Essay', score: 88 },
      { assignment: 'Quiz 2', score: 95 },
    ],
    upcomingDeadlines: [
      { id: 1, title: 'Physics Lab Report', course: 'Physics', dueDate: 'in 2 days', priority: 'high' },
      { id: 2, title: 'History Mid-term', course: 'History', dueDate: 'in 5 days', priority: 'high' },
      { id: 3, title: 'Algebra Practice Set', course: 'Math', dueDate: 'in 6 days', priority: 'medium' },
    ],
    
    upNext: {
      course: 'Algebra',
      moduleTitle: 'Understanding Polynomials',
      progress: 70,
    },
    courses: [
      { id: 1, title: 'Algebra II', teacher: 'Mr. Davison', progress: 78, nextDueDate: 'Oct 28', color: 'primary' },
      { id: 2, title: 'American History', teacher: 'Ms. Wallace', progress: 92, nextDueDate: 'Oct 26', color: 'secondary' },
      { id: 3, title: 'Physics I', teacher: 'Dr. Chen', progress: 65, nextDueDate: 'Oct 25', color: 'error' },
      { id: 4, title: 'English Literature', teacher: 'Mrs. Gable', progress: 85, nextDueDate: 'Nov 2', color: 'success' },
    ]
  },
  parent: {
    masteryMap: [
      { subject: 'Mathematics', progress: 85, status: 'success' },
      { subject: 'Physics', progress: 65, status: 'warning' },
      { subject: 'History', progress: 92, status: 'success' },
      { subject: 'English Literature', progress: 45, status: 'error' },
    ],
    wellbeingTrend: [
      { name: 'Week 1', value: 8 }, { name: 'Week 2', value: 7 }, { name: 'Week 3', value: 7 }, { name: 'Week 4', value: 5 }, { name: 'Week 5', value: 6 }, { name: 'Week 6', value: 7 },
    ],
  },
};