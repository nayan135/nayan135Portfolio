"use client"
import { motion } from "framer-motion"
import { Code, Laptop, Github, Award, GraduationCap, BookOpen } from "lucide-react"

const journeyItems = [
  { year: "2021", event: "Started coding with HTML", icon: Code },
  { year: "2022", event: "Enrolled in Computer Engineering", icon: GraduationCap },
  { year: "2022", event: "Learned about GitHub", icon: Github },
  { year: "2023", event: "Began Full-Stack Development", icon: Laptop },
  { year: "2024", event: "Achieved 3.72 GPA in SEE", icon: Award },
  { year: "2025", event: "Currently studying in Grade 11", icon: BookOpen },
]

export function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 lg:p-12 bg-gradient-to-br from-background to-secondary/10 text-foreground w-full min-h-screen overflow-auto pt-16 md:pt-20 lg:pt-8"
    >
      <div className="mt-4 md:mt-6 lg:mt-10 max-w-7xl mx-auto px-2 sm:px-4">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center px-4"
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4 md:space-y-6 px-2 sm:px-0"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">My Story</h3>
            <p className="text-base md:text-lg leading-relaxed">
              Hello! I'm Nayan Acharya, a passionate tech enthusiast and aspiring full-stack developer from Nepal. My
              coding journey began in 2021 with HTML, igniting a passion that has only grown stronger.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              In 2022, I enrolled in Computer Engineering, setting the foundation for my technical education. The same
              year, I discovered the power of version control and collaboration through GitHub.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              As I progressed, I ventured into full-stack development in 2023, expanding my skills across various
              technologies. My hard work paid off in 2024 when I achieved a 3.72 GPA in my SEE (Secondary Education
              Examination).
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Currently, I'm in Grade 11, continuing to push the boundaries of my knowledge and skills in the
              ever-evolving world of technology. My goal is to create impactful solutions and contribute to the
              developer community.
            </p>
          </motion.div>
          <motion.div className="lg:pl-8 lg:border-l-2 lg:border-gradient-to-b from-primary to-secondary px-2 sm:px-0">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">My Journey</h3>
            <ul className="space-y-4 md:space-y-6 lg:space-y-8">
              {journeyItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="flex items-start sm:items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-br from-primary to-secondary rounded-full mr-2 sm:mr-3 md:mr-4 z-10 shadow-lg flex-shrink-0 mt-1 sm:mt-0"
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-background" />
                  </motion.div>
                  <div className="bg-card bg-opacity-80 p-2 md:p-3 rounded-lg flex-grow shadow-md backdrop-blur-sm">
                    <span className="font-bold text-primary text-sm md:text-base">{item.year}</span>
                    <p className="text-xs md:text-sm mt-1">{item.event}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

