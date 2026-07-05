import { cn } from "@/lib/utils"

/**
 * ImagePlaceholder Component
 * 
 * A reusable placeholder for images that can easily be swapped with real images.
 * 
 * Usage:
 * 1. For placeholder: <ImagePlaceholder label="Hero Image" aspectRatio="16/9" />
 * 2. To swap with real image, replace with:
 *    <Image src="/images/hero.jpg" alt="Hero Image" fill className="object-cover" />
 * 
 * Props:
 * - label: Text displayed on the placeholder
 * - aspectRatio: CSS aspect ratio (e.g., "16/9", "1/1", "4/3")
 * - className: Additional CSS classes
 * - icon: Optional icon to display (defaults to image icon)
 */

interface ImagePlaceholderProps {
  label?: string
  aspectRatio?: string
  className?: string
  icon?: "image" | "user" | "logo" | "portfolio"
}

const icons = {
  image: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  user: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  logo: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  portfolio: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
}

export function ImagePlaceholder({ 
  label = "Image", 
  aspectRatio = "16/9", 
  className,
  icon = "image"
}: ImagePlaceholderProps) {
  return (
    <div 
      className={cn(
        "relative w-full bg-muted rounded-lg overflow-hidden flex flex-col items-center justify-center gap-2 text-muted-foreground",
        className
      )}
      style={{ aspectRatio }}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Icon */}
      <div className="relative z-10 opacity-40">
        {icons[icon]}
      </div>
      
      {/* Label */}
      <span className="relative z-10 text-sm font-medium opacity-60">{label}</span>
      
      {/* Comment for developers */}
      {/* 
        TO REPLACE WITH REAL IMAGE:
        1. Remove this entire ImagePlaceholder component
        2. Add your image like this:
        
        <Image 
          src="/images/your-image.jpg" 
          alt="Description" 
          fill 
          className="object-cover"
        />
        
        Or for fixed dimensions:
        
        <Image 
          src="/images/your-image.jpg" 
          alt="Description" 
          width={800} 
          height={450}
          className="object-cover"
        />
      */}
    </div>
  )
}

/**
 * RealImage Component
 * 
 * Use this when you have actual images to display.
 * Simply swap ImagePlaceholder with this component.
 */
export function RealImage({ 
  src, 
  alt, 
  aspectRatio = "16/9",
  className 
}: { 
  src: string
  alt: string
  aspectRatio?: string
  className?: string 
}) {
  return (
    <div 
      className={cn("relative w-full overflow-hidden rounded-lg", className)}
      style={{ aspectRatio }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )
}
