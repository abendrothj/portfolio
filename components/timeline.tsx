import { Card, CardContent } from "@/components/ui/card"

const timelineItems = [
  {
    title: "Computer Science Student",
    organization: "University of San Francisco",
    period: "Aug 2023 - Present",
    description:
      "Pursuing a Bachelor of Science in Computer Science with a focus on systems programming, cybersecurity, and software development. Expected graduation: Dec 2026/May 2027.",
  },
  {
    title: "Argus - File Integrity Monitor",
    organization: "Personal Project",
    period: "Dec 2024 - Jan 2025",
    description:
      "Developed a Rust-based file integrity monitoring tool using SHA256 checksums to detect unauthorized modifications. Implemented recursion, real-time monitoring, and optimized performance to process 10,000+ files in under 5 seconds.",
  },
  {
    title: "BaseX Encoder/Decoder in C",
    organization: "Personal Project",
    period: "Dec 2024",
    description:
      "Designed and implemented a high-performance encoder/decoder for Base8, Base32, and Base64 formats. Used bitwise operations and memory-efficient data structures to optimize speed and accuracy.",
  },
  {
    title: "Team Member",
    organization: "Togo's Sandwiches",
    period: "Mar 2022 - Apr 2023",
    description:
      "Delivered exceptional customer service in a high-paced environment, handling 50+ transactions per shift. Developed strong attention to detail while preparing food orders and strengthened teamwork and communication skills.",
  },
]

export default function Timeline() {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
      {timelineItems.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-muted-foreground/20 bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
          </div>

          <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">{item.period}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{item.organization}</p>
                <p className="mt-2 text-sm">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

