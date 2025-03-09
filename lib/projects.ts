interface CodeSnippet {
  title: string
  description: string
  code: string
  language: string
}

interface Benchmark {
  description: string
  results: {
    name: string
    description: string
    value: string
    unit: string
    percentage: number
  }[]
}

export interface ProjectDetail {
  name: string
  slug: string
  description: string
  image?: string
  githubUrl: string
  demoUrl?: string
  technologies: string[]
  status: string
  startDate: string
  lastUpdated: string
  primaryLanguage: string
  overview: string
  problemStatement: string
  solution: string
  challenges: string
  futureImprovements: string[]
  codeSnippets?: CodeSnippet[]
  benchmarks?: Benchmark
}

const projectDetails: ProjectDetail[] = [
  {
    name: "Argus",
    slug: "argus",
    description:
      "A directory checksum/monitoring tool built in Rust that recursively scans directories and calculates SHA-256 checksums.",
    githubUrl: "https://github.com/abendrothj/argus",
    technologies: ["Rust", "SHA-256", "File Integrity", "Cybersecurity"],
    status: "Active Development",
    startDate: "2024",
    lastUpdated: "2024",
    primaryLanguage: "Rust",
    overview:
      "Argus is a simple file integrity checker built in Rust. It recursively scans a given directory, calculates the SHA-256 checksum for each file, and stores the results in a file. It supports output in NDJSON (Newline Delimited JSON) format.",
    problemStatement:
      "File integrity monitoring is crucial for security, but many existing tools are resource-intensive or lack the flexibility needed for different environments. There was a need for a lightweight, efficient solution that could process large numbers of files quickly.",
    solution:
      "Argus addresses these challenges by implementing an efficient, recursive file monitoring system in Rust that can process files quickly. It uses SHA-256 checksums to detect even the smallest unauthorized modifications to files.",
    challenges:
      "Developing Argus presented several challenges, including optimizing the recursive directory traversal, implementing efficient checksum calculation and comparison, and designing a user-friendly command-line interface. The most significant challenge was balancing performance with comprehensive monitoring capabilities.",
    futureImprovements: [
      "Checking against old checksums for changes (WIP)",
      "Implement real-time alerting via email or messaging services",
      "Add support for different hashing algorithms",
      "Develop a configuration file system for easier setup",
      "Create a web interface for monitoring and alerts",
    ],
    codeSnippets: [
      {
        title: "Directory Scanning Implementation",
        description: "This function recursively scans a directory and calculates checksums for each file.",
        code: `fn scan_directory(path: &Path) -> Result<Vec<FileRecord>, Error> {
    let mut records = Vec::new();
    
    for entry in fs::read_dir(path)? {
        let entry = entry?;
        let path = entry.path();
        
        if path.is_dir() {
            // Recursively scan subdirectories
            let mut sub_records = scan_directory(&path)?;
            records.append(&mut sub_records);
        } else {
            // Process file
            let record = FileRecord::new(path)?;
            records.push(record);
        }
    }
    
    Ok(records)
}`,
        language: "rust",
      },
      {
        title: "Checksum Calculation",
        description: "This function calculates the SHA-256 checksum for a given file.",
        code: `fn calculate_checksum(path: &Path) -> Result<[u8; 32], Error> {
    let mut file = File::open(path)?;
    let mut hasher = Sha256::new();
    let mut buffer = [0; 8192]; // 8KB buffer for efficient reading
    
    loop {
        let bytes_read = file.read(&mut buffer)?;
        if bytes_read == 0 {
            break;
        }
        hasher.update(&buffer[..bytes_read]);
    }
    
    Ok(hasher.finalize().into())
}`,
        language: "rust",
      },
    ],
  },
  {
    name: "BaseX",
    slug: "basex",
    description: "A Base8/Base32/Base64 encoder/decoder implemented in C for efficient file encoding and decoding.",
    githubUrl: "https://github.com/abendrothj/BaseX",
    technologies: ["C", "Encoding", "Decoding", "Base64", "Base32", "Base8"],
    status: "Completed",
    startDate: "2023",
    lastUpdated: "2024",
    primaryLanguage: "C",
    overview:
      "BaseX is a command-line tool for encoding and decoding files using the Base8, Base32, and Base64 formats. It provides a straightforward interface for transforming file content into these formats or decoding them back to their original state.",
    problemStatement:
      "Encoding and decoding between binary data and text representations is a common task in many applications, but existing libraries often prioritize flexibility over performance or have unnecessary dependencies.",
    solution:
      "BaseX provides a lightweight, dependency-free implementation that uses efficient algorithms for maximum performance. The library is designed to be easily integrated into other projects while maintaining high standards of efficiency and accuracy.",
    challenges:
      "The main challenge was implementing the encoding and decoding algorithms efficiently. Another challenge was ensuring the code remained memory-efficient while handling variable-length input data.",
    futureImprovements: [
      "Add support for more encoding schemes like Base85",
      "Implement streaming encode/decode for large data",
      "Create bindings for other programming languages",
      "Add comprehensive test suite for edge cases",
      "Optimize further for specific CPU architectures",
    ],
    codeSnippets: [
      {
        title: "Base64 Encoding Function",
        description: "This function encodes binary data to Base64 format.",
        code: `void base64_encode(const unsigned char *data, size_t input_length, char *encoded_data) {
    static const char encoding_table[] = {
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'
    };
    
    size_t output_length = 4 * ((input_length + 2) / 3);
    
    for (size_t i = 0, j = 0; i < input_length;) {
        uint32_t octet_a = i < input_length ? data[i++] : 0;
        uint32_t octet_b = i < input_length ? data[i++] : 0;
        uint32_t octet_c = i < input_length ? data[i++] : 0;
        
        uint32_t triple = (octet_a << 16) + (octet_b << 8) + octet_c;
        
        encoded_data[j++] = encoding_table[(triple >> 18) & 0x3F];
        encoded_data[j++] = encoding_table[(triple >> 12) & 0x3F];
        encoded_data[j++] = encoding_table[(triple >> 6) & 0x3F];
        encoded_data[j++] = encoding_table[triple & 0x3F];
    }
    
    // Add padding if necessary
    for (size_t i = 0; i < mod_table[input_length % 3]; i++)
        encoded_data[output_length - 1 - i] = '=';
}`,
        language: "c",
      },
      {
        title: "Base64 Decoding Function",
        description: "This function decodes Base64 data back to binary format.",
        code: `int base64_decode(const char *data, size_t input_length, unsigned char *decoded_data) {
    static const unsigned char decoding_table[256] = {0};
    static int table_initialized = 0;
    
    if (!table_initialized) {
        for (int i = 0; i < 64; i++)
            decoding_table[(unsigned char) encoding_table[i]] = i;
        table_initialized = 1;
    }
    
    if (input_length % 4 != 0) return -1;
    
    size_t output_length = input_length / 4 * 3;
    if (data[input_length - 1] == '=') output_length--;
    if (data[input_length - 2] == '=') output_length--;
    
    for (size_t i = 0, j = 0; i < input_length;) {
        uint32_t sextet_a = data[i] == '=' ? 0 & i++ : decoding_table[data[i++]];
        uint32_t sextet_b = data[i] == '=' ? 0 & i++ : decoding_table[data[i++]];
        uint32_t sextet_c = data[i] == '=' ? 0 & i++ : decoding_table[data[i++]];
        uint32_t sextet_d = data[i] == '=' ? 0 & i++ : decoding_table[data[i++]];
        
        uint32_t triple = (sextet_a << 18) + (sextet_b << 12) + (sextet_c << 6) + sextet_d;
        
        if (j < output_length) decoded_data[j++] = (triple >> 16) & 0xFF;
        if (j < output_length) decoded_data[j++] = (triple >> 8) & 0xFF;
        if (j < output_length) decoded_data[j++] = triple & 0xFF;
    }
    
    return output_length;
}`,
        language: "c",
      },
    ],
  },
  {
    name: "Sudoku",
    slug: "sudoku",
    description: "A Sudoku game implementation with solver and generator functionality.",
    githubUrl: "https://github.com/abendrothj/Sudoku",
    technologies: ["Java", "Algorithms", "Backtracking", "Game Development"],
    status: "Completed",
    startDate: "2023",
    lastUpdated: "2023",
    primaryLanguage: "Java",
    overview:
      "This project is a complete Sudoku game implementation that includes a puzzle generator, solver, and interactive game interface. It uses backtracking algorithms to efficiently generate and solve Sudoku puzzles.",
    problemStatement:
      "Creating a Sudoku game requires efficient algorithms for both generating valid puzzles and solving them. The challenge was to implement these algorithms in a way that is both computationally efficient and provides a good user experience.",
    solution:
      "The solution uses a backtracking algorithm for both generating and solving puzzles. The generator creates valid Sudoku boards and then removes numbers strategically to create puzzles of varying difficulty levels. The solver can find solutions to any valid Sudoku puzzle.",
    challenges:
      "The main challenges included implementing an efficient backtracking algorithm, ensuring the generated puzzles have unique solutions, and creating difficulty levels that provide an appropriate challenge for different skill levels.",
    futureImprovements: [
      "Implement a more sophisticated difficulty rating system",
      "Add a hint system for players",
      "Improve the UI with animations and better visual feedback",
      "Add a timer and scoring system",
      "Create a mobile version of the game",
    ],
    codeSnippets: [
      {
        title: "Sudoku Solver Algorithm",
        description: "This function implements a backtracking algorithm to solve Sudoku puzzles.",
        code: `public boolean solve(int[][] board) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            // Find an empty cell
            if (board[row][col] == 0) {
                // Try placing digits 1-9
                for (int num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        // Place the digit if it's valid
                        board[row][col] = num;
                        
                        // Recursively try to solve the rest of the puzzle
                        if (solve(board)) {
                            return true;
                        }
                        
                        // If placing the digit didn't lead to a solution, backtrack
                        board[row][col] = 0;
                    }
                }
                // If no digit works in this cell, the puzzle is unsolvable
                return false;
            }
        }
    }
    // If we've filled all cells, the puzzle is solved
    return true;
}

private boolean isValid(int[][] board, int row, int col, int num) {
    // Check row
    for (int c = 0; c < 9; c++) {
        if (board[row][c] == num) {
            return false;
        }
    }
    
    // Check column
    for (int r = 0; r < 9; r++) {
        if (board[r][col] == num) {
            return false;
        }
    }
    
    // Check 3x3 box
    int boxRow = row - row % 3;
    int boxCol = col - col % 3;
    for (int r = boxRow; r < boxRow + 3; r++) {
        for (int c = boxCol; c < boxCol + 3; c++) {
            if (board[r][c] == num) {
                return false;
            }
        }
    }
    
    return true;
}`,
        language: "java",
      },
    ],
  },
  {
    name: "Image Steganography",
    slug: "image-steganography",
    description: "A tool for hiding data within images using steganography techniques.",
    githubUrl: "https://github.com/abendrothj/image-steganography",
    technologies: ["Python", "Steganography", "Image Processing", "Cybersecurity"],
    status: "Completed",
    startDate: "2023",
    lastUpdated: "2023",
    primaryLanguage: "Python",
    overview:
      "This project implements various steganography techniques to hide data within images. It allows users to embed text or binary data in image files in a way that is imperceptible to the human eye.",
    problemStatement:
      "Secure communication sometimes requires hiding the existence of the message itself. Steganography provides a way to hide data within other data, but implementing it effectively requires careful manipulation of image data to avoid detection.",
    solution:
      "This tool implements several steganography techniques, including least significant bit (LSB) substitution, which modifies the least significant bits of pixel values to store hidden data without noticeably changing the image's appearance.",
    challenges:
      "The main challenges included implementing the steganography algorithms to maximize data capacity while minimizing visual changes to the image, handling different image formats, and ensuring the hidden data could be reliably extracted.",
    futureImprovements: [
      "Add support for more steganography techniques",
      "Implement encryption for the hidden data",
      "Create a graphical user interface",
      "Add support for hiding data in audio and video files",
      "Implement steganalysis tools to detect hidden data",
    ],
    codeSnippets: [
      {
        title: "LSB Steganography Implementation",
        description: "This function hides data in an image using the least significant bit technique.",
        code: `def hide_data_in_image(image_path, data, output_path):
    # Open the image
    img = Image.open(image_path)
    # Convert image to RGB if it's not already
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Convert data to binary
    binary_data = ''.join(format(ord(char), '08b') for char in data)
    # Add terminator
    binary_data += '00000000'
    
    data_index = 0
    data_len = len(binary_data)
    
    # Get pixel data
    pixels = list(img.getdata())
    new_pixels = []
    
    for pixel in pixels:
        if data_index < data_len:
            # Get RGB values
            r, g, b = pixel
            
            # Modify red channel
            if data_index < data_len:
                r = r & ~1 | int(binary_data[data_index])
                data_index += 1
            
            # Modify green channel
            if data_index < data_len:
                g = g & ~1 | int(binary_data[data_index])
                data_index += 1
            
            # Modify blue channel
            if data_index < data_len:
                b = b & ~1 | int(binary_data[data_index])
                data_index += 1
            
            new_pixels.append((r, g, b))
        else:
            new_pixels.append(pixel)
    
    # Create new image with modified pixels
    new_img = Image.new(img.mode, img.size)
    new_img.putdata(new_pixels)
    
    # Save the new image
    new_img.save(output_path)
    
    return data_index >= data_len`,
        language: "python",
      },
    ],
  },
  {
    name: "FracCalc",
    slug: "fraccalc",
    description: "A calculator application for performing arithmetic operations on fractions.",
    githubUrl: "https://github.com/abendrothj/FracCalc",
    technologies: ["Java", "Mathematics", "Algorithms"],
    status: "Completed",
    startDate: "2022",
    lastUpdated: "2022",
    primaryLanguage: "Java",
    overview:
      "FracCalc is a calculator application that allows users to perform arithmetic operations (addition, subtraction, multiplication, and division) on fractions. It handles mixed numbers, improper fractions, and whole numbers.",
    problemStatement:
      "Performing arithmetic operations on fractions can be complex, especially when dealing with mixed numbers and different denominators. This project aimed to create a tool that could handle these operations accurately and efficiently.",
    solution:
      "FracCalc parses input expressions containing fractions, converts them to a common format, performs the requested operation, and returns the result in simplified form. It handles mixed numbers by converting them to improper fractions for calculations.",
    challenges:
      "The main challenges included parsing complex fraction expressions, implementing the arithmetic operations correctly, and ensuring the results were always simplified to their lowest terms.",
    futureImprovements: [
      "Add support for more complex expressions with multiple operations",
      "Implement a graphical user interface",
      "Add support for decimal to fraction conversion",
      "Include additional mathematical functions like exponentiation",
      "Implement step-by-step solution display for educational purposes",
    ],
    codeSnippets: [
      {
        title: "Fraction Addition Implementation",
        description: "This function adds two fractions together and returns the result in simplified form.",
        code: `public static String addFractions(String fraction1, String fraction2) {
    // Parse fractions
    int[] frac1 = parseFraction(fraction1);
    int[] frac2 = parseFraction(fraction2);
    
    // Get numerators and denominators
    int num1 = frac1[0];
    int den1 = frac1[1];
    int num2 = frac2[0];
    int den2 = frac2[1];
    
    // Find common denominator
    int commonDen = lcm(den1, den2);
    
    // Convert fractions to common denominator
    num1 = num1 * (commonDen / den1);
    num2 = num2 * (commonDen / den2);
    
    // Add numerators
    int resultNum = num1 + num2;
    
    // Simplify the result
    return simplifyFraction(resultNum, commonDen);
}

private static int[] parseFraction(String fraction) {
    // Handle mixed numbers
    if (fraction.contains("_")) {
        String[] parts = fraction.split("_");
        int whole = Integer.parseInt(parts[0]);
        String[] fracParts = parts[1].split("/");
        int num = Integer.parseInt(fracParts[0]);
        int den = Integer.parseInt(fracParts[1]);
        
        // Convert to improper fraction
        num = whole * den + num;
        return new int[] {num, den};
    }
    // Handle simple fractions
    else if (fraction.contains("/")) {
        String[] parts = fraction.split("/");
        int num = Integer.parseInt(parts[0]);
        int den = Integer.parseInt(parts[1]);
        return new int[] {num, den};
    }
    // Handle whole numbers
    else {
        int whole = Integer.parseInt(fraction);
        return new int[] {whole, 1};
    }
}

private static String simplifyFraction(int num, int den) {
    // Handle zero
    if (num == 0) {
        return "0";
    }
    
    // Find GCD to simplify
    int gcd = gcd(Math.abs(num), Math.abs(den));
    num /= gcd;
    den /= gcd;
    
    // Handle negative fractions
    boolean isNegative = (num < 0) ^ (den < 0);
    num = Math.abs(num);
    den = Math.abs(den);
    
    // Convert to mixed number if possible
    if (num >= den) {
        int whole = num / den;
        num = num % den;
        
        if (num == 0) {
            return isNegative ? "-" + whole : String.valueOf(whole);
        } else {
            return (isNegative ? "-" : "") + whole + "_" + num + "/" + den;
        }
    } else {
        return (isNegative ? "-" : "") + num + "/" + den;
    }
}

private static int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

private static int lcm(int a, int b) {
    return a * (b / gcd(a, b));
}`,
        language: "java",
      },
    ],
  },
  {
    name: "BabyNames",
    slug: "babynames",
    description: "An analysis tool for baby name trends and popularity over time.",
    githubUrl: "https://github.com/abendrothj/BabyNames",
    technologies: ["Java", "Data Analysis", "Statistics"],
    status: "Completed",
    startDate: "2022",
    lastUpdated: "2022",
    primaryLanguage: "Java",
    overview:
      "BabyNames is a data analysis tool that processes historical baby name data to identify trends, popularity changes, and statistical patterns over time. It allows users to search for specific names and view their popularity trends.",
    problemStatement:
      "Analyzing large datasets of baby names to identify trends and patterns requires efficient data processing and statistical analysis. This project aimed to create a tool that could process this data and present meaningful insights.",
    solution:
      "The solution involves parsing large CSV files containing baby name data, organizing the data into efficient data structures, and implementing various analysis algorithms to extract insights about name popularity, gender distribution, and trends over time.",
    challenges:
      "The main challenges included efficiently processing large datasets, implementing statistical analysis algorithms, and creating meaningful visualizations of the trends and patterns discovered in the data.",
    futureImprovements: [
      "Add more advanced statistical analysis features",
      "Implement graphical visualizations of trends",
      "Create a web interface for easier access",
      "Add predictive features for future name popularity",
      "Include international name data for cross-cultural analysis",
    ],
    codeSnippets: [
      {
        title: "Name Trend Analysis",
        description: "This function analyzes the popularity trend of a specific name over time.",
        code: `public NameTrend analyzeNameTrend(String name, int startYear, int endYear) {
    List<YearData> yearDataList = new ArrayList<>();
    int maxRank = 0;
    int minRank = Integer.MAX_VALUE;
    int maxYear = 0;
    int minYear = 0;
    
    for (int year = startYear; year <= endYear; year++) {
        // Get data for this year
        YearlyData yearData = dataByYear.get(year);
        if (yearData == null) continue;
        
        // Find the name in this year's data
        NameData nameData = yearData.getNameData(name);
        if (nameData == null) continue;
        
        int rank = nameData.getRank();
        int count = nameData.getCount();
        
        // Track max and min popularity
        if (rank > 0 && rank < minRank) {
            minRank = rank;
            minYear = year;
        }
        if (rank > maxRank) {
            maxRank = rank;
            maxYear = year;
        }
        
        // Add to year data list
        yearDataList.add(new YearData(year, rank, count));
    }
    
    // Calculate trend direction
    TrendDirection direction = TrendDirection.STABLE;
    if (yearDataList.size() >= 2) {
        YearData first = yearDataList.get(0);
        YearData last = yearDataList.get(yearDataList.size() - 1);
        
        if (last.getRank() < first.getRank()) {
            direction = TrendDirection.INCREASING;
        } else if (last.getRank() > first.getRank()) {
            direction = TrendDirection.DECREASING;
        }
    }
    
    return new NameTrend(name, yearDataList, minRank, maxRank, minYear, maxYear, direction);
}`,
        language: "java",
      },
    ],
  },
  {
    name: "Portfolio",
    slug: "portfolio",
    description: "My personal portfolio website built with Next.js and Tailwind CSS.",
    githubUrl: "https://github.com/abendrothj/portfolio",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    status: "Active Development",
    startDate: "March 2025",
    lastUpdated: "March 2025",
    primaryLanguage: "TypeScript",
    overview:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.",
    problemStatement:
      "I needed a professional online presence to showcase my work, skills, and experience to potential employers and collaborators.",
    solution:
      "This portfolio website provides a clean, responsive interface with sections for projects, skills, and contact information. It's built with modern web technologies for optimal performance and user experience.",
    challenges:
      "Creating a design that effectively communicates my skills and experience while maintaining a clean, professional aesthetic. Implementing responsive design principles to ensure the site works well on all devices.",
    futureImprovements: [
      "Add a blog section for technical articles",
      "Implement dark/light mode toggle",
      "Add more interactive elements",
      "Integrate with more external APIs",
      "Improve accessibility features",
    ],
    codeSnippets: [
      {
        title: "Responsive Navigation Component",
        description: "A responsive navigation bar that adapts to different screen sizes.",
        code: `"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Resume", path: "/resume" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Handle scroll for navbar background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Handle window resize for mobile detection
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial checks
    handleScroll()
    handleResize()

    // Add event listeners
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <header
      className={\`sticky top-0 z-50 w-full transition-all duration-200 \${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }\`}
    >
      {/* Navigation content */}
    </header>
  )
}`,
        language: "tsx",
      },
    ],
  },
]

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectDetails.find((project) => project.slug === slug)
}

