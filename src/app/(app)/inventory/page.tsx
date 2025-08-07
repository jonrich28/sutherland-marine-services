
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input, useSearch } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast';
import { initialInventoryItems } from '@/lib/data';


type InventoryItem = typeof initialInventoryItems[0];


export default function InventoryPage() {
  useSearch("[data-search-input]", "[data-search-item]");
  const { toast } = useToast();
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [isAddPartOpen, setAddPartOpen] = useState(false);
  const [isEditPartOpen, setEditPartOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<InventoryItem | null>(null);
  const [newPart, setNewPart] = useState({ name: '', brand: '', stock: '0', price: '$0.00' });
  const [editedPart, setEditedPart] = useState({ name: '', brand: '', stock: '0', price: '', location: '' });

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    if(newPart.name && newPart.brand && newPart.stock && newPart.price) {
      const newItem: InventoryItem = {
        id: `PRT-${(inventoryItems.length + 1).toString().padStart(3, '0')}`,
        name: newPart.name,
        brand: newPart.brand,
        stock: parseInt(newPart.stock),
        quantity: parseInt(newPart.stock),
        location: 'Unassigned',
        price: newPart.price,
        reorderPoint: Math.max(5, Math.floor(parseInt(newPart.stock) * 0.2)),
        cost: parseFloat(newPart.price.replace('$', '')) || 0,
      };
      setInventoryItems([...inventoryItems, newItem]);
      toast({
        title: "Part Added",
        description: `${newPart.name} has been added to inventory.`,
      });
      setNewPart({ name: '', brand: '', stock: '0', price: '$0.00' });
      setAddPartOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill out all fields to add a new part.",
      });
    }
  };

  const handleEditPart = (part: InventoryItem) => {
    setSelectedPart(part);
    setEditedPart({
      name: part.name,
      brand: part.brand,
      stock: part.stock.toString(),
      price: part.price,
      location: part.location,
    });
    setEditPartOpen(true);
  };

  const handleUpdatePart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPart) return;

    const updatedItems = inventoryItems.map((item) =>
      item.id === selectedPart.id ? { ...item, ...editedPart, stock: parseInt(editedPart.stock) } : item
    );
    setInventoryItems(updatedItems);
    toast({
      title: "Part Updated",
      description: `${editedPart.name} has been updated.`,
    });
    setEditPartOpen(false);
    setSelectedPart(null);
  };


  return (
     <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">Inventory</h1>
            <p className="text-muted-foreground">Track and manage service parts and stock levels.</p>
        </div>
        <Dialog open={isAddPartOpen} onOpenChange={setAddPartOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Part
            </Button>
          </DialogTrigger>
           <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddPart}>
              <DialogHeader>
                <DialogTitle>Add New Part</DialogTitle>
                <DialogDescription>
                  Enter the details for the new inventory item.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={newPart.name} onChange={e => setNewPart({...newPart, name: e.target.value})} placeholder="Propeller" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="brand" className="text-right">Brand</Label>
                  <Input id="brand" value={newPart.brand} onChange={e => setNewPart({...newPart, brand: e.target.value})} placeholder="Quicksilver" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">Stock</Label>
                  <Input id="stock" value={newPart.stock} onChange={e => setNewPart({...newPart, stock: e.target.value})} type="number" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">Price</Label>
                  <Input id="price" value={newPart.price} onChange={e => setNewPart({...newPart, price: e.target.value})} placeholder="$150.00" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Part</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Stock Items</CardTitle>
          <CardDescription>All parts and materials currently in stock.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Part ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id} data-search-item>
                  <TableCell className="font-medium" data-search-value={item.id}>{item.id}</TableCell>
                  <TableCell data-search-value={item.name}>{item.name}</TableCell>
                  <TableCell data-search-value={item.brand}>{item.brand}</TableCell>
                  <TableCell>
                     <Badge variant={item.stock < 5 ? "destructive" : item.stock < 20 ? "secondary" : "default" }>{item.stock}</Badge>
                  </TableCell>
                  <TableCell data-search-value={item.location}>{item.location}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleEditPart(item)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isEditPartOpen} onOpenChange={setEditPartOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleUpdatePart}>
            <DialogHeader>
              <DialogTitle>Edit Part: {selectedPart?.name}</DialogTitle>
              <DialogDescription>
                Update the details for this inventory item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input id="edit-name" value={editedPart.name} onChange={e => setEditedPart({...editedPart, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-brand" className="text-right">Brand</Label>
                <Input id="edit-brand" value={editedPart.brand} onChange={e => setEditedPart({...editedPart, brand: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">Stock</Label>
                <Input id="edit-stock" value={editedPart.stock} onChange={e => setEditedPart({...editedPart, stock: e.target.value})} type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">Price</Label>
                <Input id="edit-price" value={editedPart.price} onChange={e => setEditedPart({...editedPart, price: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">Location</Label>
                <Input id="edit-location" value={editedPart.location} onChange={e => setEditedPart({...editedPart, location: e.target.value})} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
