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
      className="p-6 md:p-12 bg-gradient-to-br from-background to-secondary/10 text-foreground w-full min-h-screen overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-4">My Story</h3>
            <p className="text-lg">
              Hello! I'm Nayan Acharya, a passionate tech enthusiast and aspiring full-stack developer from Nepal. My
              coding journey began in 2021 with HTML, igniting a passion that has only grown stronger.
            </p>
            <p className="text-lg">
              In 2022, I enrolled in Computer Engineering, setting the foundation for my technical education. The same
              year, I discovered the power of version control and collaboration through GitHub.
            </p>
            <p className="text-lg">
              As I progressed, I ventured into full-stack development in 2023, expanding my skills across various
              technologies. My hard work paid off in 2024 when I achieved a 3.72 GPA in my SEE (Secondary Education
              Examination).
            </p>
            <p className="text-lg">
              Currently, I'm in Grade 11, continuing to push the boundaries of my knowledge and skills in the
              ever-evolving world of technology. My goal is to create impactful solutions and contribute to the
              developer community.
            </p>
          </motion.div>
          <motion.div className="pl-8 border-l-2 border-gradient-to-b from-primary to-secondary">
            <h3 className="text-2xl font-semibold mb-8">My Journey</h3>
            <ul className="space-y-8">
              {journeyItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="flex items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary to-secondary rounded-full mr-4 z-10 shadow-lg"
                  >
                    <item.icon className="w-6 h-6 text-background" />
                  </motion.div>
                  <div className="bg-card bg-opacity-80 p-3 rounded-lg flex-grow shadow-md backdrop-blur-sm">
                    <span className="font-bold text-primary">{item.year}</span>
                    <p className="text-sm mt-1">{item.event}</p>
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

