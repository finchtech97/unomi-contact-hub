import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  ChevronDown, 
  Download, 
  Eye, 
  Edit2, 
  Trash2, 
  Star,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Import avatar images
import avatarCharlie from "@/assets/avatar-charlie.jpg";
import avatarDanial from "@/assets/avatar-danial.jpg";
import avatarDean from "@/assets/avatar-dean.jpg";
import avatarHence from "@/assets/avatar-hence.jpg";

// Mock data that matches the screenshot
const contactsData = [
  {
    id: "1",
    name: "Charlie Chaplin",
    email: "charlie@leernoca.monster",
    phone: "+741 56 7896",
    tags: ["Collaborator"],
    labels: ["Inventory"],
    dateCreated: "13 Jan, 2019",
    avatar: avatarCharlie,
    starred: false,
  },
  {
    id: "2",
    name: "Danial Craig",
    email: "danialc@jampack.com",
    phone: "+145 52 5689",
    tags: ["Collaborator"],
    labels: ["Developer"],
    dateCreated: "24 Jun, 2019",
    avatar: avatarDanial,
    starred: false,
  },
  {
    id: "3",
    name: "Dean Shaw",
    email: "dean-shaw@poww.me",
    phone: "+234 48 2365",
    tags: ["Collaborator", "Angular Developer"],
    labels: ["Design"],
    dateCreated: "21 Feb, 2019",
    avatar: avatarDean,
    starred: true,
  },
  {
    id: "4",
    name: "Hence Work",
    email: "contact@hencework.com",
    phone: "+145 52 5463",
    tags: ["Promotion"],
    labels: ["Design"],
    dateCreated: "30 Mar, 2019",
    avatar: avatarHence,
    starred: true,
  },
  {
    id: "5",
    name: "Huma Therman",
    email: "huma@clariesup.au",
    phone: "+234 48 2365",
    tags: ["Collaborator", "Angular Developer"],
    labels: ["Developer"],
    dateCreated: "13 Jan, 2020",
    avatar: avatarCharlie,
    starred: true,
  },
  {
    id: "6",
    name: "John Brother",
    email: "john@cryodrakon.info",
    phone: "+456 52 4862",
    tags: ["Promotion", "Collaborator"],
    labels: ["Human Resource"],
    dateCreated: "14 Jan, 2019",
    avatar: avatarDanial,
    starred: false,
  },
  {
    id: "7",
    name: "Jaquline Joker",
    email: "jaquljoker@jampack.com",
    phone: "+145 53 4715",
    tags: ["Promotion", "Collaborator"],
    labels: ["Design"],
    dateCreated: "3 July, 2020",
    avatar: avatarDean,
    starred: false,
  },
  {
    id: "8",
    name: "Katharine Jones",
    email: "joneskath@jampack.com",
    phone: "+741 56 7896",
    tags: ["Promotion"],
    labels: ["Inventory"],
    dateCreated: "24 Jun, 2019",
    avatar: avatarHence,
    starred: false,
  },
  {
    id: "9",
    name: "Morgan Freeman",
    email: "morgan@jampack.com",
    phone: "+145 52 5689",
    tags: ["Promotion", "Collaborator"],
    labels: ["Design"],
    dateCreated: "13 Jan, 2020",
    avatar: avatarCharlie,
    starred: true,
  },
];

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("dateCreated");

  // Filter contacts based on search term
  const filteredContacts = useMemo(() => {
    return contactsData.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      contact.labels.some(label => label.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  // Handle individual select
  const handleSelectContact = (contactId: string, checked: boolean) => {
    if (checked) {
      setSelectedContacts([...selectedContacts, contactId]);
    } else {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    }
  };

  // Get tag variant based on tag name
  const getTagVariant = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "collaborator":
        return "bg-collaborator text-collaborator-foreground";
      case "angular developer":
        return "bg-developer text-developer-foreground";
      case "promotion":
        return "bg-promotion text-promotion-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContacts = filteredContacts.slice(startIndex, endIndex);

  return (
    <div className="p-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Bulk actions <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Delete selected</DropdownMenuItem>
              <DropdownMenuItem>Export selected</DropdownMenuItem>
              <DropdownMenuItem>Add to campaign</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="secondary">Apply</Button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dateCreated">Date Created</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline">
            Export to CSV <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">View</span>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            {startIndex + 1} – {Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length}
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-12"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Labels</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentContacts.map((contact) => (
                <TableRow key={contact.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <Star 
                        className={`h-4 w-4 ${contact.starred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{contact.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {contact.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {contact.phone}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, index) => (
                        <Badge key={index} className={getTagVariant(tag)}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contact.labels.map((label, index) => (
                        <span key={index} className="text-sm text-muted-foreground">
                          {label}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {contact.dateCreated}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button variant="action" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="action" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="action" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="action" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Send message</DropdownMenuItem>
                          <DropdownMenuItem>Add to campaign</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete contact
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}