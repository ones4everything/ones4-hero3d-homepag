import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-black text-muted-foreground py-12 px-6" role="contentinfo">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-foreground font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-foreground transition-colors">Wearables</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Computing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Displays</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Components</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Warranty</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2026 ONES4. All rights reserved.</p>
          <p className="text-sm">Immersive commerce hardware for the quantum age.</p>
        </div>
      </div>
    </footer>
  )
}
