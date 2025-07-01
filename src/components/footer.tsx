export function Footer() {
  return (
    <footer className="flex h-14 items-center justify-center border-t bg-background px-4 md:px-6 text-sm text-muted-foreground">
      <p>
        &copy; {new Date().getFullYear()} My Application. All rights reserved.
      </p>
    </footer>
  );
}
