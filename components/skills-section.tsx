import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Shield, Terminal, Cpu, Database, GitBranch, Zap, Network, FileCode, Lock } from "lucide-react"

// Define proficiency levels
type ProficiencyLevel = "Expert" | "Advanced" | "Proficient" | "Familiar"

// Define skill categories with more meaningful information
const skillCategories = [
  {
    name: "Programming Languages",
    skills: [
      {
        name: "Rust",
        level: "Advanced" as ProficiencyLevel,
        icon: <Cpu className="h-5 w-5" />,
        projects: ["Argus (File Integrity Monitor)", "Systems programming"],
      },
      {
        name: "C/C++",
        level: "Advanced" as ProficiencyLevel,
        icon: <Code2 className="h-5 w-5" />,
        projects: ["BaseX (Encoding Library)", "Low-level performance optimization"],
      },
      {
        name: "Java",
        level: "Proficient" as ProficiencyLevel,
        icon: <FileCode className="h-5 w-5" />,
        projects: ["Sudoku", "FracCalc", "BabyNames"],
      },
      {
        name: "Python",
        level: "Proficient" as ProficiencyLevel,
        icon: <Terminal className="h-5 w-5" />,
        projects: ["Image Steganography", "Data processing"],
      },
    ],
  },
  {
    name: "Systems & Security",
    skills: [
      {
        name: "Systems Programming",
        level: "Advanced" as ProficiencyLevel,
        icon: <Cpu className="h-5 w-5" />,
        projects: ["Argus", "BaseX", "Low-level optimization"],
      },
      {
        name: "Cybersecurity",
        level: "Advanced" as ProficiencyLevel,
        icon: <Shield className="h-5 w-5" />,
        projects: ["Image Steganography", "File integrity monitoring"],
      },
      {
        name: "File Integrity Monitoring",
        level: "Expert" as ProficiencyLevel,
        icon: <Lock className="h-5 w-5" />,
        projects: ["Argus project", "Checksum verification systems"],
      },
      {
        name: "Algorithms",
        level: "Proficient" as ProficiencyLevel,
        icon: <Network className="h-5 w-5" />,
        projects: ["Sudoku solver", "Data analysis in BabyNames"],
      },
    ],
  },
  {
    name: "Tools & Technologies",
    skills: [
      {
        name: "Linux/Unix",
        level: "Advanced" as ProficiencyLevel,
        icon: <Terminal className="h-5 w-5" />,
        projects: ["System administration", "Shell scripting", "Environment configuration"],
      },
      {
        name: "Git & Version Control",
        level: "Proficient" as ProficiencyLevel,
        icon: <GitBranch className="h-5 w-5" />,
        projects: ["Open-source contributions", "Collaborative development"],
      },
      {
        name: "Data Analysis",
        level: "Proficient" as ProficiencyLevel,
        icon: <Database className="h-5 w-5" />,
        projects: ["BabyNames", "Statistical processing"],
      },
      {
        name: "Performance Optimization",
        level: "Advanced" as ProficiencyLevel,
        icon: <Zap className="h-5 w-5" />,
        projects: ["BaseX", "Argus", "Algorithm efficiency"],
      },
    ],
  },
]

// Map proficiency levels to colors
const proficiencyColors: Record<ProficiencyLevel, string> = {
  Expert: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Advanced: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Proficient: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Familiar: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

export default function SkillsSection() {
  return (
    <div className="space-y-12">
      {skillCategories.map((category) => (
        <div key={category.name} className="space-y-4">
          <h3 className="text-xl font-semibold">{category.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.skills.map((skill) => (
              <Card
                key={skill.name}
                className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">{skill.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">{skill.name}</h4>
                        <Badge className={`${proficiencyColors[skill.level]} border-none`}>{skill.level}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {skill.projects.map((project, index) => (
                          <span key={index} className="inline-block">
                            {project}
                            {index < skill.projects.length - 1 ? " • " : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

