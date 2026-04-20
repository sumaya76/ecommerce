import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav className="flex items-center gap-1.5 text-sm text-muted-foreground py-4">
    <Link to="/" className="hover:text-accent transition-colors"><Home size={14} /></Link>
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-1.5">
        <ChevronRight size={14} className="opacity-40" />
        {item.path ? (
          <Link to={item.path} className="hover:text-accent transition-colors">{item.label}</Link>
        ) : (
          <span className="text-foreground font-medium">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumbs;
