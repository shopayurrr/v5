import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AdminPanel() {
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<any | null>(null);

  const { data: usersData, isLoading: loadingUsers } = useQuery<{users: any[]}>({
    queryKey: ["/api/admin/users"],
  });

  const updateUserMutation = useMutation({
    mutationFn: async (userData: any) => {
      await apiRequest("PATCH", `/api/admin/users/${userData.id}`, userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setEditingUser(null);
      toast({ title: "Success", description: "User information updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update user", variant: "destructive" });
    }
  });

  if (loadingUsers) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Management Panel</h1>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Accounts</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData?.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <UserAccountsView userId={user.id} />
                    </TableCell>
                    <TableCell>
                      <Dialog open={editingUser?.id === user.id} onOpenChange={(open) => !open && setEditingUser(null)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setEditingUser(user)}>Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit User: {user.username}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-6 py-4">
                            <section className="space-y-4">
                              <h3 className="font-semibold border-b pb-2">Profile Information</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="firstName">First Name</Label>
                                  <Input id="firstName" value={editingUser?.firstName || ""} onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lastName">Last Name</Label>
                                  <Input id="lastName" value={editingUser?.lastName || ""} onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="dob">Date of Birth</Label>
                                  <Input id="dob" value={editingUser?.dateOfBirth || ""} onChange={(e) => setEditingUser({...editingUser, dateOfBirth: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="ssn">Social Security Number</Label>
                                  <Input id="ssn" value={editingUser?.socialSecurityNumber || ""} onChange={(e) => setEditingUser({...editingUser, socialSecurityNumber: e.target.value})} />
                                </div>
                                <div className="space-y-2 col-span-2">
                                  <Label htmlFor="occupation">Occupation</Label>
                                  <Input id="occupation" value={editingUser?.occupation || ""} onChange={(e) => setEditingUser({...editingUser, occupation: e.target.value})} />
                                </div>
                              </div>
                            </section>

                            <section className="space-y-4">
                              <h3 className="font-semibold border-b pb-2">Address Information</h3>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="homeAddress">Home Address</Label>
                                  <Input id="homeAddress" value={editingUser?.homeAddress || ""} onChange={(e) => setEditingUser({...editingUser, homeAddress: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="mailingAddress">Mailing Address</Label>
                                  <Input id="mailingAddress" value={editingUser?.mailingAddress || ""} onChange={(e) => setEditingUser({...editingUser, mailingAddress: e.target.value})} />
                                </div>
                              </div>
                            </section>

                            <section className="space-y-4">
                              <h3 className="font-semibold border-b pb-2">Phone & Email</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="primaryPhone">Primary Phone</Label>
                                  <Input id="primaryPhone" value={editingUser?.primaryPhone || ""} onChange={(e) => setEditingUser({...editingUser, primaryPhone: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="secondaryPhone">Secondary Phone</Label>
                                  <Input id="secondaryPhone" value={editingUser?.secondaryPhone || ""} onChange={(e) => setEditingUser({...editingUser, secondaryPhone: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="email">Primary Email</Label>
                                  <Input id="email" value={editingUser?.email || ""} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="alternateEmail">Alternate Email</Label>
                                  <Input id="alternateEmail" value={editingUser?.alternateEmail || ""} onChange={(e) => setEditingUser({...editingUser, alternateEmail: e.target.value})} />
                                </div>
                              </div>
                            </section>

                            <section className="space-y-4">
                              <h3 className="font-semibold border-b pb-2">Account Summary</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="availableBalance">Available Balance</Label>
                                  <Input id="availableBalance" value={editingUser?.availableBalance || ""} onChange={(e) => setEditingUser({...editingUser, availableBalance: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="everydayChecking">Everyday Checking Balance</Label>
                                  <Input id="everydayChecking" value={editingUser?.everydayChecking || ""} onChange={(e) => setEditingUser({...editingUser, everydayChecking: e.target.value})} />
                                </div>
                              </div>
                            </section>

                            <section className="space-y-4">
                              <h3 className="font-semibold border-b pb-2">Recent Transactions</h3>
                              <div className="space-y-2">
                                <Label htmlFor="transactions">Transactions (Mock/Text)</Label>
                                <textarea 
                                  id="transactions" 
                                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={editingUser?.transactions || ""} 
                                  onChange={(e) => setEditingUser({...editingUser, transactions: e.target.value})} 
                                  placeholder="Enter transaction history..."
                                />
                              </div>
                            </section>
                          </div>
                          <Button className="w-full" onClick={() => updateUserMutation.mutate(editingUser)}>Save Changes</Button>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UserAccountsView({ userId }: { userId: number }) {
  const { data: accountsData, isLoading } = useQuery<{accounts: any[]}>({
    queryKey: [`/api/admin/users/${userId}/accounts`],
  });

  const [editValue, setEditValue] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const { toast } = useToast();

  const updateBalanceMutation = useMutation({
    mutationFn: async ({ accountId, balance }: { accountId: number, balance: string }) => {
      await apiRequest("PATCH", `/api/admin/accounts/${accountId}/balance`, { balance });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/users/${userId}/accounts`] });
      setEditingId(null);
      toast({ title: "Success", description: "Balance updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update balance", variant: "destructive" });
    }
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async (accountId: number) => {
      await apiRequest("DELETE", `/api/admin/accounts/${accountId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/users/${userId}/accounts`] });
      toast({ title: "Success", description: "Account deleted" });
    }
  });

  if (isLoading) return <span>Loading accounts...</span>;

  return (
    <div className="space-y-2">
      {accountsData?.accounts.map(account => (
        <div key={account.id} className="flex items-center gap-2 text-sm border-b pb-1">
          <span className="w-32">{account.accountType}:</span>
          {editingId === account.id ? (
            <>
              <Input 
                value={editValue} 
                onChange={(e) => setEditValue(e.target.value)}
                className="h-8 w-24"
              />
              <Button size="sm" onClick={() => updateBalanceMutation.mutate({ accountId: account.id, balance: editValue })}>Save</Button>
              <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
            </>
          ) : (
            <>
              <span className="font-mono w-24">${account.balance}</span>
              <Button size="sm" variant="ghost" onClick={() => {
                setEditingId(account.id);
                setEditValue(account.balance);
              }}>Edit</Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteAccountMutation.mutate(account.id)}>Delete</Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
