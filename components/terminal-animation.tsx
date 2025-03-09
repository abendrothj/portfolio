"use client"

import { useEffect, useRef } from "react"

// Real code snippets and system outputs related to systems programming and security
const CODE_SNIPPETS = [
  `fn verify_checksum(file_path: &Path) -> Result<bool, Error> {
    let mut file = File::open(file_path)?;
    let mut hasher = Sha256::new();
    let mut buffer = [0; 1024];
    
    loop {
        let bytes_read = file.read(&mut buffer)?;
        if bytes_read == 0 {
            break;
        }
        hasher.update(&buffer[..bytes_read]);
    }
    
    let result = hasher.finalize();
    Ok(result == expected_hash)
}`,
  `int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <file_path>\\n", argv[0]);
        return EXIT_FAILURE;
    }
    
    FILE *file = fopen(argv[1], "rb");
    if (!file) {
        perror("Failed to open file");
        return EXIT_FAILURE;
    }
    
    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256_CTX sha256;
    SHA256_Init(&sha256);
    
    const int bufSize = 32768;
    unsigned char *buffer = malloc(bufSize);
    int bytesRead = 0;
    
    if (!buffer) {
        fprintf(stderr, "Memory allocation failed\\n");
        fclose(file);
        return EXIT_FAILURE;
    }
    
    while((bytesRead = fread(buffer, 1, bufSize, file)) > 0) {
        SHA256_Update(&sha256, buffer, bytesRead);
    }
    
    SHA256_Final(hash, &sha256);
    
    for(int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
        printf("%02x", hash[i]);
    }
    printf("\\n");
    
    free(buffer);
    fclose(file);
    return EXIT_SUCCESS;
}`,
  `def monitor_directory(path, interval=5):
    """Monitor a directory for changes using checksums."""
    baseline = {}
    
    # Create initial baseline
    for root, _, files in os.walk(path):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'rb') as f:
                    file_hash = hashlib.sha256(f.read()).hexdigest()
                    baseline[file_path] = file_hash
            except (IOError, OSError):
                continue
    
    print(f"Baseline created with {len(baseline)} files")
    
    while True:
        time.sleep(interval)
        for file_path, original_hash in baseline.items():
            if not os.path.exists(file_path):
                print(f"[ALERT] File deleted: {file_path}")
                continue
                
            try:
                with open(file_path, 'rb') as f:
                    current_hash = hashlib.sha256(f.read()).hexdigest()
                if current_hash != original_hash:
                    print(f"[ALERT] File modified: {file_path}")
                    print(f"  - Old hash: {original_hash}")
                    print(f"  - New hash: {current_hash}")
                    baseline[file_path] = current_hash
            except (IOError, OSError):
                continue`,
  `#[derive(Debug)]
struct FileRecord {
    path: PathBuf,
    hash: [u8; 32],
    last_modified: SystemTime,
    size: u64,
}

impl FileRecord {
    fn new(path: PathBuf) -> Result<Self, io::Error> {
        let metadata = fs::metadata(&path)?;
        let hash = compute_hash(&path)?;
        
        Ok(FileRecord {
            path,
            hash,
            last_modified: metadata.modified()?,
            size: metadata.len(),
        })
    }
    
    fn is_modified(&self) -> Result<bool, io::Error> {
        let metadata = fs::metadata(&self.path)?;
        if metadata.len() != self.size || metadata.modified()? != self.last_modified {
            let current_hash = compute_hash(&self.path)?;
            return Ok(current_hash != self.hash);
        }
        Ok(false)
    }
}`,
  `$ sudo tcpdump -i eth0 -nn -v 'tcp port 443'
tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
14:22:31.326589 IP (tos 0x0, ttl 64, id 59876, offset 0, flags [DF], proto TCP (6), length 60)
    192.168.1.105.58472 > 151.101.65.69.443: Flags [S], cksum 0x1e8a (correct), seq 3561522893, win 64240, options [mss 1460,sackOK,TS val 1140268335 ecr 0,nop,wscale 7], length 0
14:22:31.341307 IP (tos 0x0, ttl 57, id 0, offset 0, flags [DF], proto TCP (6), length 60)
    151.101.65.69.443 > 192.168.1.105.58472: Flags [S.], cksum 0x9c1d (correct), seq 2881317550, ack 3561522894, win 65535, options [mss 1460,sackOK,TS val 1368206548 ecr 1140268335,nop,wscale 9], length 0`,
  `$ strace -e trace=open,read,write,connect,accept ./program
execve("./program", ["./program"], 0x7ffd8e5db6a0 /* 66 vars */) = 0
open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
open("/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
open("config.txt", O_RDONLY)             = 3
read(3, "debug=true\\nlog_level=info\\nport="..., 4096) = 42
connect(3, {sa_family=AF_INET, sin_port=htons(8080), sin_addr=inet_addr("127.0.0.1")}, 16) = 0
write(1, "Connected to server\\n", 20)    = 20
read(3, "Welcome to the server\\n", 4096) = 22
write(1, "Server says: Welcome to the serv"..., 32) = 32`,
  `$ objdump -d -M intel ./program

./program:     file format elf64-x86-64

Disassembly of section .text:

0000000000001160 <main>:
    1160:       55                      push   rbp
    1161:       48 89 e5                mov    rbp,rsp
    1164:       48 83 ec 20             sub    rsp,0x20
    1168:       89 7d ec                mov    DWORD PTR [rbp-0x14],edi
    116b:       48 89 75 e0             mov    QWORD PTR [rbp-0x20],rsi
    116f:       83 7d ec 01             cmp    DWORD PTR [rbp-0x14],0x1
    1173:       7f 19                   jg     118e <main+0x2e>
    1175:       48 8b 45 e0             mov    rax,QWORD PTR [rbp-0x20]
    1179:       48 8b 00                mov    rax,QWORD PTR [rax]
    117c:       48 89 c6                mov    rsi,rax
    117f:       48 8d 3d 7e 0e 00 00    lea    rdi,[rip+0xe7e]        # 2004 <_IO_stdin_used+0x4>
    1186:       b8 00 00 00 00          mov    eax,0x0
    118b:       e8 c0 fe ff ff          call   1050 <printf@plt>`,
  `$ nm -D /lib/x86_64-linux-gnu/libc.so.6 | grep -E "open|read|write"
0000000000110e50 T __open
0000000000110e50 T __open64
0000000000110e50 W open
0000000000110e50 W open64
00000000000fed00 T __pread64
00000000000fed00 W pread
00000000000fed00 W pread64
00000000000fec80 T __read
00000000000fec80 W read
00000000000ff190 T __write
00000000000ff190 W write`,
  `$ lsof -p 1234
COMMAND  PID   USER   FD   TYPE DEVICE SIZE/OFF    NODE NAME
program 1234 jake    cwd    DIR    8,1     4096  131073 /home/jake/projects
program 1234 jake    rtd    DIR    8,1     4096       2 /
program 1234 jake    txt    REG    8,1   325752  131074 /home/jake/projects/program
program 1234 jake    mem    REG    8,1  2029592 1835018 /usr/lib/x86_64-linux-gnu/libc-2.31.so
program 1234 jake    mem    REG    8,1   191504 1835008 /usr/lib/x86_64-linux-gnu/ld-2.31.so
program 1234 jake     0u   CHR  136,0      0t0       3 /dev/pts/0
program 1234 jake     1u   CHR  136,0      0t0       3 /dev/pts/0
program 1234 jake     2u   CHR  136,0      0t0       3 /dev/pts/0
program 1234 jake     3r   REG    8,1     1024  131075 /home/jake/projects/data.bin`,
]

export default function TerminalAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Terminal settings
    const fontSize = 12
    const lineHeight = fontSize * 1.5
    const fontFamily = 'Consolas, Monaco, "Andale Mono", monospace'
    ctx.font = `${fontSize}px ${fontFamily}`

    // Animation state
    type CodeBlock = {
      text: string[]
      x: number
      y: number
      maxWidth: number
      currentLine: number
      lineProgress: number
      speed: number
      complete: boolean
      opacity: number
      fadeDirection: "in" | "out"
    }

    let codeBlocks: CodeBlock[] = []
    let frameCount = 0

    // Prepare code snippets by splitting them into lines
    const preparedSnippets = CODE_SNIPPETS.map((snippet) => snippet.split("\n").map((line) => line.trim()))

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add new code block occasionally
      if (frameCount % 180 === 0 && codeBlocks.length < 5) {
        const randomSnippetIndex = Math.floor(Math.random() * preparedSnippets.length)
        const snippetLines = preparedSnippets[randomSnippetIndex]

        // Find the longest line to determine width
        let maxLineWidth = 0
        snippetLines.forEach((line) => {
          const lineWidth = ctx.measureText(line).width
          if (lineWidth > maxLineWidth) {
            maxLineWidth = lineWidth
          }
        })

        // Position the code block
        const x = 20 + Math.random() * (canvas.width - maxLineWidth - 40)
        const y = 40 + Math.random() * (canvas.height - snippetLines.length * lineHeight - 80)

        codeBlocks.push({
          text: snippetLines,
          x,
          y,
          maxWidth: maxLineWidth,
          currentLine: 0,
          lineProgress: 0,
          speed: 0.5 + Math.random() * 0.5,
          complete: false,
          opacity: 0,
          fadeDirection: "in",
        })
      }

      // Draw and update code blocks
      codeBlocks.forEach((block, blockIndex) => {
        // Handle fading
        if (block.fadeDirection === "in" && block.opacity < 1) {
          block.opacity += 0.01
        } else if (block.fadeDirection === "out") {
          block.opacity -= 0.01
          if (block.opacity <= 0) {
            codeBlocks[blockIndex] = { ...block, text: [] }
          }
        }

        // Set opacity
        ctx.globalAlpha = block.opacity

        // Choose color based on the first line (to differentiate languages)
        const firstLine = block.text[0] || ""
        let color = "rgba(0, 255, 0, 0.7)" // Default green for terminal output

        if (firstLine.includes("fn ") || firstLine.includes("struct ") || firstLine.includes("#[derive")) {
          color = "rgba(222, 165, 132, 0.8)" // Rust (orange-ish)
        } else if (firstLine.includes("int ") || firstLine.includes("void ") || firstLine.includes("#include")) {
          color = "rgba(86, 156, 214, 0.8)" // C/C++ (blue)
        } else if (firstLine.includes("def ") || firstLine.includes("import ") || firstLine.startsWith('"""')) {
          color = "rgba(78, 201, 176, 0.8)" // Python (teal)
        } else if (firstLine.startsWith("$")) {
          color = "rgba(220, 220, 170, 0.8)" // Shell commands (yellow-ish)
        }

        ctx.fillStyle = color

        if (!block.complete) {
          // Still typing out the code
          const currentLineText = block.text[block.currentLine] || ""
          const visibleText = currentLineText.substring(0, Math.floor(block.lineProgress))

          // Draw all completed lines
          for (let i = 0; i < block.currentLine; i++) {
            ctx.fillText(block.text[i], block.x, block.y + i * lineHeight)
          }

          // Draw current line being typed
          ctx.fillText(visibleText, block.x, block.y + block.currentLine * lineHeight)

          // Update progress
          block.lineProgress += block.speed

          // Move to next line if current line is complete
          if (block.lineProgress >= currentLineText.length + 10) {
            // +10 for a pause
            block.currentLine++
            block.lineProgress = 0

            // Check if all lines are complete
            if (block.currentLine >= block.text.length) {
              block.complete = true
            }
          }
        } else {
          // All lines are complete, just draw them
          block.text.forEach((line, lineIndex) => {
            ctx.fillText(line, block.x, block.y + lineIndex * lineHeight)
          })

          // Start fading out after some time
          if (Math.random() < 0.001) {
            block.fadeDirection = "out"
          }
        }

        // Reset opacity
        ctx.globalAlpha = 1
      })

      // Remove empty blocks
      codeBlocks = codeBlocks.filter((block) => block.text.length > 0)

      frameCount++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
}

