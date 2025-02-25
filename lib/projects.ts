export interface Contributor {
  name: string
  role: string
  avatar: string
  link: string
}

export interface Project {
  title: string
  description: string
  detailedDescription: string
  image: string
  slug: string
  demoUrl: string
  githubUrl: string
  contributors: Contributor[]
  images: string[];
}

export const projects: Project[] = [
  {
    title: "FITGREEN",
    description: "A health & fitness platform with a gamified experience.",
    detailedDescription: `
      <h2>About FITGREEN</h2>
      <p>FitGreen was inspired by the need for a platform that motivates healthier lifestyles by tracking daily fitness and wellness metrics, empowering people to create and maintain healthy habits.</p>

      <h2>What it does</h2>
      <ul>
        <li>Handles user authentication, registration, and secure sessions.</li>
        <li>Allows users to track fitness metrics such as weight, height, age, gender, and water intake.</li>
        <li>Awards points for achievements like meeting water intake goals and daily login.</li>
        <li>Sends email notifications for verification, login confirmations, and more.</li>
      </ul>

      <h2>How we built it</h2>
      <ul>
        <li><strong>Frontend:</strong> Built using Next.js and React for dynamic and server-side rendered pages.</li>
        <li><strong>Backend:</strong> API routes in Next.js with integration to MongoDB for data storage.</li>
        <li><strong>Authentication:</strong> Implemented with NextAuth (credentials provider) for robust session management.</li>
        <li><strong>Email Service:</strong> Integrated Mailjet for sending transactional emails related to user actions.</li>
        <li><strong>Points System:</strong> Designed a custom rewards system to encourage healthy activities.</li>
      </ul>

      <h2>Challenges we ran into</h2>
      <ul>
        <li>Managing dynamic routes and consistent data flow between the client and server.</li>
        <li>Handling asynchronous operations and robust error checking across API endpoints.</li>
        <li>Normalizing and validating user inputs during sign-up and data submission.</li>
        <li>Integrating third-party services such as Mailjet and ensuring secure storage of credentials.</li>
      </ul>

      <h2>Accomplishments that we're proud of</h2>
      <ul>
        <li>Successfully implemented a full-stack health tracking platform.</li>
        <li>Achieved seamless user authentication and session handling with NextAuth.</li>
        <li>Developed a dynamic, responsive interface for monitoring and updating fitness metrics.</li>
        <li>Built a scalable and modular codebase that simplifies future enhancements.</li>
      </ul>

      <h2>What we learned</h2>
      <ul>
        <li>Best practices for building and managing API routes in Next.js.</li>
        <li>The importance of thorough error handling and input validation.</li>
        <li>How to integrate external services and maintain security in a full-stack application.</li>
        <li>Techniques to design motivational features that add value to user experience.</li>
      </ul>

      <h2>What's next for FitGreen</h2>
      <ul>
        <li>Enhance the user interface with real-time data visualization.</li>
        <li>Add additional metrics and workout tracking features.</li>
        <li>Integrate wearable device data for automatic metrics updating.</li>
        <li>Expand community features such as challenges, leaderboards, and social sharing.</li>
      </ul>
    `,
    image: "/images/fitgreen.jpg",
    images: [
      "/images/fitgreen-1.jpg",
      "/images/fitgreen-2.jpg",
      "/images/fitgreen-3.jpg",
      "/images/fitgreen-4.jpg",
    ],
    slug: "fitgreen",
    demoUrl: "https://fitgreen.nayanacharya.info.np",
    githubUrl: "https://github.com/nayan135/fitgreenproj",
    contributors: [
      {
        name: "Nayan Acharya",
        role: "Backend Developer",
        avatar: "/images/avatars/myself.jpg",
        link: "https://github.com/nayan135",
      },
      {
        name: "Narayan Bhusal",
        role: "Frontend Developer | UI/UX Designer",
        avatar: "/images/avatars/narayan.jpg",
        link: "https://github.com/naranbhusal02",
      },
      {
        name: "Dilip Acharya",
        role: "Backend Developer",
        avatar: "/images/avatars/mission.jpg",
        link: "https://github.com/JCT-B",
      },

      {
        name: "Shasank Shrestha",
        role: "Frontend Developer",
        avatar: "/images/avatars/shasank.jpg",
        link: "https://github.com/shasank00",
      },
      {
        name: "Sanjog Pandey",
        role: "Designer",
        avatar: "/images/avatars/sanjog.jpg",
        link: "",
      },

    ],
  },
  {
    title: "EDUMENTOR",
    description: "An education platform for learning 21st-century skills.",
    detailedDescription: `
      <h2>About EduMentor</h2>
      <p>EduMentor was created to address the need for a personalized tutoring system that blends expert mentorship with adaptive learning. Traditional education often lacks individualized attention and real-time progress tracking. EduMentor bridges this gap by offering tailored learning paths, expert guidance, and an engaging community that fosters growth and collaboration.</p>

      <h2>What it does</h2>
      <ul>
        <li>Provides personalized learning journeys tailored to each student's needs.</li>
        <li>Tracks real-time progress to monitor academic performance.</li>
        <li>Offers expert mentoring to guide students throughout their learning journey.</li>
        <li>Creates a vibrant learning community for discussions, challenges, and collaboration.</li>
      </ul>

      <h2>How we built it</h2>
      <ul>
        <li><strong>Frontend:</strong> Built using React and TypeScript (TSX) to ensure interactivity and user-friendliness.</li>
        <li><strong>Learning Features:</strong> Implemented real-time progress tracking, AI-driven personalized learning paths, and expert mentorship.</li>
        <li><strong>Community Engagement:</strong> Developed an interactive platform to encourage discussions and collaborative learning.</li>
      </ul>

      <h2>Challenges we ran into</h2>
      <ul>
        <li>Implementing an adaptive learning algorithm that adjusts to student needs.</li>
        <li>Ensuring smooth real-time data updates for progress tracking.</li>
        <li>Managing dynamic user authentication and session handling.</li>
        <li>Creating an intuitive and engaging user interface.</li>
      </ul>

      <h2>Accomplishments that we're proud of</h2>
      <ul>
        <li>Successfully built a full-fledged mentorship and learning platform.</li>
        <li>Integrated real-time monitoring to help students track progress seamlessly.</li>
        <li>Developed a user-friendly interface that enhances engagement.</li>
        <li>Created a strong community-driven approach to learning.</li>
      </ul>

      <h2>What we learned</h2>
      <ul>
        <li>Best practices for structuring and optimizing a React-based learning platform.</li>
        <li>Importance of data-driven learning recommendations for personalized education.</li>
        <li>How to integrate real-time analytics for better user experience.</li>
        <li>The role of mentorship and peer collaboration in effective learning.</li>
      </ul>

      <h2>What's next for EduMentor</h2>
      <ul>
        <li>Enhance AI-driven recommendations for a more personalized learning experience.</li>
        <li>Expand mentorship features with live tutoring sessions.</li>
        <li>Integrate gamification and achievement-based rewards.</li>
        <li>Add support for interactive quizzes and knowledge assessments.</li>
        <li>Launch a mobile-friendly version for on-the-go learning.</li>
      </ul>
    `,

    image: "/images/edumentor.jpg",
    images: [],
    slug: "edumentor",
    demoUrl: "https://edumentor.nayanacharya.info.np",
    githubUrl: "https://github.com/nayan135/edumentor",
    contributors: [
      {
        name: "Nayan Acharya",
        role: "Backend Developer",
        avatar: "/images/avatars/myself.jpg",
        link: "https://github.com/nayan135",
      },
      {
        name: "Narayan Bhusal",
        role: "Frontend Developer | UI/UX Designer",
        avatar: "/images/avatars/narayan.jpg",
        link: "https://github.com/naranbhusal02",
      },
    ],
  },
  {
    title: "AALANKAR",
    description: "A music management system for artists and listeners.",
    detailedDescription: `
    <h2>About AALANKAR</h2>
    <p>The inspiration behind AALANKAR stemmed from the desire to create a dynamic web-based platform that offers seamless audio playback and user authentication. Recognizing the need for an integrated system that combines multimedia capabilities with secure user management, AALANKAR was developed to provide an engaging and personalized user experience.</p>

    <h2>What it does</h2>
    <ul>
      <li>Facilitates secure user authentication, registration, and session management.</li>
      <li>Enables users to stream and manage audio content directly through the platform.</li>
      <li>Provides a responsive and intuitive user interface for easy navigation and interaction.</li>
    </ul>

    <h2>How we built it</h2>
    <ul>
      <li><strong>Frontend:</strong> Developed using HTML, CSS, and JavaScript to create a responsive and interactive user interface.</li>
      <li><strong>Backend:</strong> Implemented with PHP to handle server-side operations, including user authentication and audio data management.</li>
      <li><strong>Styling:</strong> Utilized CSS and Less for designing a cohesive and visually appealing layout.</li>
      <li><strong>Audio Handling:</strong> Created PHP scripts, such as <code>get_audio.php</code>, to manage audio file retrieval and streaming.</li>
    </ul>

    <h2>Challenges we ran into</h2>
    <ul>
      <li>Ensuring secure and efficient user authentication and session management.</li>
      <li>Implementing seamless audio streaming capabilities across different devices and browsers.</li>
      <li>Designing a user-friendly interface that adapts to various screen sizes and resolutions.</li>
      <li>Managing and organizing audio files effectively on the server.</li>
    </ul>

    <h2>Accomplishments that we're proud of</h2>
    <ul>
      <li>Successfully integrated secure user authentication and session handling.</li>
      <li>Developed a robust audio streaming feature that provides high-quality playback.</li>
      <li>Designed a responsive and intuitive user interface that enhances user engagement.</li>
      <li>Established a scalable codebase that allows for future enhancements and feature additions.</li>
    </ul>

    <h2>What we learned</h2>
    <ul>
      <li>Advanced techniques in PHP for handling server-side operations and security.</li>
      <li>Best practices in frontend development to create responsive and interactive user interfaces.</li>
      <li>Effective methods for managing and streaming multimedia content on web platforms.</li>
      <li>The importance of cohesive design and user experience in web application development.</li>
    </ul>

    <h2>What's next for AALANKAR</h2>
    <ul>
      <li>Enhance the audio player with features like playlists, repeat, and shuffle options.</li>
      <li>Implement user profile customization and personalized content recommendations.</li>
      <li>Expand the platform to support additional media types, such as video content.</li>
      <li>Integrate social sharing features to allow users to share content with their networks.</li>
      <li>Optimize the platform for mobile devices to provide a seamless experience across all devices.</li>
    </ul>
  `,

    image: "/images/aalankar.jpg",
    images: [
      "/images/aalankar-1.jpg",
      "/images/aalankar-2.jpg",
    ],
    slug: "aalankar",
    demoUrl: "",
    githubUrl: "https://github.com/nayan135/aalankar",
    contributors: [
      {
        name: "Nayan Acharya",
        role: "Lead Developer",
        avatar: "/images/avatars/myself.jpg",
        link: "https://github.com/nayan135",
      },

      {
        name: "Shasank Shrestha",
        role: "Frontend Developer",
        avatar: "/images/avatars/shasank.jpg",
        link: "https://github.com/shasank00",
      },
      {
        name: "Narayan Bhusal",
        role: "Frontend Developer",
        avatar: "/images/avatars/narayan.jpg",
        link: "https://github.com/naranbhusal02",
      },
    ],
  },
  {
    title: "TIC-TAC-TOE",
    description: "An interactive JavaScript-based Tic-Tac-Toe game.",
    detailedDescription: `
      <h2>About TIK-TAC-TOE</h2>
      <p>The inspiration behind TicTacToe was to create a simple yet engaging web-based game that allows users to enjoy the classic game of Tic Tac Toe. The goal was to provide a platform where users can play against each other, enhancing their strategic thinking and providing entertainment.</p>

      <h2>What it does</h2>
      <ul>
        <li>Enables two players to play Tic Tac Toe on the same device.</li>
        <li>Provides a clean and intuitive user interface for seamless gameplay.</li>
        <li>Automatically detects and announces the winner or a draw.</li>
      </ul>

      <h2>How I built it</h2>
      <ul>
        <li><strong>Frontend:</strong> Developed using HTML for structure, CSS for styling, and JavaScript for game logic and interactivity.</li>
        <li><strong>Game Logic:</strong> Implemented JavaScript functions to handle player moves, check for win conditions, and manage game state.</li>
        <li><strong>User Interface:</strong> Designed a responsive layout ensuring compatibility across various devices and screen sizes.</li>
      </ul>

      <h2>Challenges I ran into</h2>
      <ul>
        <li>Ensuring the game logic accurately detects all possible win conditions and draws.</li>
        <li>Creating a responsive design that provides a consistent experience on different devices.</li>
        <li>Implementing a user-friendly interface that is both intuitive and visually appealing.</li>
      </ul>

      <h2>Accomplishments that I'm proud of</h2>
      <ul>
        <li>Successfully developed a fully functional Tic Tac Toe game from scratch.</li>
        <li>Designed an intuitive and engaging user interface that enhances user experience.</li>
        <li>Ensured cross-browser compatibility and responsiveness across various devices.</li>
      </ul>

      <h2>What I learned</h2>
      <ul>
        <li>Deepened my understanding of JavaScript, particularly in handling game logic and state management.</li>
        <li>Enhanced my skills in responsive web design using CSS.</li>
        <li>Learned effective debugging techniques to troubleshoot and resolve issues during development.</li>
      </ul>

      <h2>What's next for TicTacToe</h2>
      <ul>
        <li>Implement an AI opponent for single-player mode, offering varying levels of difficulty.</li>
        <li>Add features like score tracking and player profiles to enhance user engagement.</li>
        <li>Incorporate sound effects and animations to make the gameplay more dynamic and enjoyable.</li>
      </ul>
    `,

    image: "/images/tiktactoe.jpg",
    images: [
      "/images/tictactoe-1.jpg",
    ],
    slug: "tic-tac-toe",
    demoUrl: "https://tiktactoe-six.vercel.app",
    githubUrl: "https://github.com/nayan135/tiktactoe",
    contributors: [
      {
        name: "Nayan Acharya",
        role: "Lead Developer",
        avatar: "/images/avatars/myself.jpg",
        link: "https://github.com/nayan135",
      },

    ],
  },
  {
    title: "WEATHER APP",
    description: "A real-time weather application with global forecasts.",
    detailedDescription: `
      <h2>About WeatherApp</h2>
      <p>The Weather App was inspired by the desire to provide users with a simple and efficient way to access real-time weather information for any location. Recognizing the importance of weather data in daily planning, the app aims to deliver accurate forecasts through a user-friendly interface.</p>

      <h2>What it does</h2>
      <ul>
        <li>Allows users to search for current weather conditions in any city worldwide.</li>
        <li>Displays essential weather data, including temperature, humidity, and weather descriptions.</li>
        <li>Features a responsive design, ensuring compatibility across various devices and screen sizes.</li>
      </ul>

      <h2>How I built it</h2>
      <ul>
        <li><strong>Frontend:</strong> Developed using HTML for structure, CSS for styling, and JavaScript for functionality.</li>
        <li><strong>Weather Data:</strong> Integrated with the OpenWeatherMap API to fetch real-time weather information based on user input.</li>
        <li><strong>Deployment:</strong> Hosted the application on Vercel for seamless access and performance.</li>
      </ul>

      <h2>Challenges I ran into</h2>
      <ul>
        <li>Ensuring accurate parsing and display of data retrieved from the OpenWeatherMap API.</li>
        <li>Designing a responsive and intuitive user interface that enhances user experience.</li>
        <li>Managing asynchronous API calls and handling potential errors gracefully.</li>
      </ul>

      <h2>Accomplishments that I'm proud of</h2>
      <ul>
        <li>Successfully developed and deployed a functional weather application accessible online.</li>
        <li>Achieved seamless integration with a third-party API to provide real-time data.</li>
        <li>Created a clean and responsive design that offers a consistent experience across devices.</li>
      </ul>

      <h2>What I learned</h2>
      <ul>
        <li>Enhanced my skills in frontend web development, particularly in HTML, CSS, and JavaScript.</li>
        <li>Gained experience in working with external APIs and handling JSON data.</li>
        <li>Learned effective deployment strategies for web applications using platforms like Vercel.</li>
      </ul>

      <h2>What's next for the Weather App</h2>
      <ul>
        <li>Implementing additional features such as 5-day weather forecasts and weather alerts.</li>
        <li>Enhancing the user interface with dynamic backgrounds and animations based on weather conditions.</li>
        <li>Adding support for geolocation to automatically display weather data for the user's current location.</li>
      </ul>
    `,

    image: "/images/weather.jpg",
    images: [
      "/images/weather-1.jpg",
      "/images/weather-2.jpg",
    ],
    slug: "weather-app",
    demoUrl: "https://weather-six-hazel.vercel.app",
    githubUrl: "https://github.com/nayan135/weather",
    contributors: [
      {
        name: "Nayan Acharya",
        role: "Lead Developer",
        avatar: "/images/avatars/myself.jpg",
        link: "https://github.com/nayan135",
      },

    ],
  },
]
