export default function Footer() {
  return (
    <footer className="w-full border-t py-8 bg-white">
      <div className="container mx-auto px-4 text-center">

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} IndoFPA. All rights reserved.
        </p>

        {/* <div className="flex justify-center mt-4 gap-6 text-sm text-muted-foreground">
          <a href="#privacy" className="hover:text-primary">Privacy Policy</a>
          <a href="#terms" className="hover:text-primary">Terms</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </div> */}

      </div>
    </footer>
  );
}
