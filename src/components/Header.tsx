import { useState } from 'react'
import { List, MagnifyingGlass, Microphone, User, ShoppingCart } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 h-16 px-6 py-4 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-glass' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Open navigation menu"
            >
              <List size={24} weight="regular" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-card border-border">
            <nav className="flex flex-col gap-6 mt-8">
              <a href="#wearables" className="text-lg font-semibold hover:text-primary transition-colors">
                Wearables
              </a>
              <a href="#computing" className="text-lg font-semibold hover:text-primary transition-colors">
                Computing
              </a>
              <a href="#displays" className="text-lg font-semibold hover:text-primary transition-colors">
                Displays
              </a>
              <a href="#components" className="text-lg font-semibold hover:text-primary transition-colors">
                Components
              </a>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-glow">ONES4</span>
          </h1>

          <div className="relative flex-1 max-w-md hidden md:block">
            <MagnifyingGlass 
              size={20} 
              weight="regular"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-12 pr-12 h-10 bg-secondary/50 border-input focus:border-accent focus:neon-glow rounded-full transition-all"
              aria-label="Search products"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:text-primary transition-colors"
              aria-label="Voice search"
            >
              <Microphone size={18} weight="regular" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-foreground hover:text-primary transition-colors md:flex hidden"
            aria-label="Search"
          >
            <MagnifyingGlass size={24} weight="regular" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            className="text-foreground hover:text-primary transition-colors"
            aria-label="User profile"
          >
            <User size={24} weight="regular" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={24} weight="regular" />
          </Button>
        </div>
      </div>
    </header>
  )
}
