
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Book,
  Gamepad,
  MessageSquare,
  Pencil,
  Plus,
  Trash2,
  Users
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Types pour nos données culturelles
interface ProverbItem {
  id: string;
  original: string;
  translation: string;
  meaning: string;
}

interface ContentItem {
  id: string;
  title: string;
  content: string;
}

interface GameItem {
  id: string;
  name: string;
  description: string;
}

interface BeliefItem {
  id: string;
  category: string;
  name: string;
  description: string;
}

// Données initiales pour les tests
const initialProverbs: ProverbItem[] = [
  {
    id: "p1",
    original: "لي بغا العسل يصبر لقريص النحل",
    translation: "Celui qui veut du miel doit supporter les piqûres d'abeilles",
    meaning: "Il faut endurer des difficultés pour atteindre ses objectifs"
  },
  {
    id: "p2",
    original: "الكلام لي ما ينفع، سكوت منو أنفع",
    translation: "Si les mots ne sont pas utiles, le silence est plus bénéfique",
    meaning: "Parfois il vaut mieux se taire que parler sans but"
  }
];

const initialPoems: ContentItem[] = [
  {
    id: "poem1",
    title: "Le désert",
    content: "Étendue dorée sous un soleil ardent\nLe désert étend son tapis infini\nOù seules les étoiles guident le voyageur errant\nDans ce royaume de silence et de beauté"
  }
];

const initialTales: ContentItem[] = [
  {
    id: "tale1",
    title: "La Légende du Puits de Tiris",
    content: "Dans les vastes étendues du désert sahraoui, il existe un puits ancien connu sous le nom de Puits de Tiris. Selon la légende, ce puits fut créé par un saint homme qui, voyant la souffrance de son peuple durant une longue sécheresse, planta son bâton dans le sable et pria toute la nuit."
  }
];

const initialGames: GameItem[] = [
  {
    id: "game1",
    name: "Siggan",
    description: "Ce jeu d'adresse consiste à lancer et à attrapper de petites pierres dans différentes configurations. Il développe la coordination œil-main et la concentration."
  }
];

const initialBeliefs: BeliefItem[] = [
  {
    id: "belief1",
    category: "spiritual",
    name: "Rituels de protection",
    description: "Rituels de protection contre le mauvais œil transmis de génération en génération."
  }
];

const Dashboard = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("proverbs");
  
  // États pour les données
  const [proverbs, setProverbs] = useState<ProverbItem[]>(initialProverbs);
  const [poems, setPoems] = useState<ContentItem[]>(initialPoems);
  const [tales, setTales] = useState<ContentItem[]>(initialTales);
  const [games, setGames] = useState<GameItem[]>(initialGames);
  const [beliefs, setBeliefs] = useState<BeliefItem[]>(initialBeliefs);
  
  // État pour les dialogues
  const [proverbDialogOpen, setProverbDialogOpen] = useState(false);
  const [poemDialogOpen, setPoemDialogOpen] = useState(false);
  const [taleDialogOpen, setTaleDialogOpen] = useState(false);
  const [gameDialogOpen, setGameDialogOpen] = useState(false);
  const [beliefDialogOpen, setBeliefDialogOpen] = useState(false);
  
  // États pour les formulaires
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newProverb, setNewProverb] = useState<Omit<ProverbItem, "id">>({
    original: "",
    translation: "",
    meaning: ""
  });
  const [newPoem, setNewPoem] = useState<Omit<ContentItem, "id">>({
    title: "",
    content: ""
  });
  const [newTale, setNewTale] = useState<Omit<ContentItem, "id">>({
    title: "",
    content: ""
  });
  const [newGame, setNewGame] = useState<Omit<GameItem, "id">>({
    name: "",
    description: ""
  });
  const [newBelief, setNewBelief] = useState<Omit<BeliefItem, "id">>({
    category: "spiritual",
    name: "",
    description: ""
  });

  // Fonctions pour manipuler les proverbes
  const handleAddProverb = () => {
    if (!newProverb.original || !newProverb.translation || !newProverb.meaning) {
      toast({
        title: language === 'en' ? "Error" : language === 'fr' ? "Erreur" : "خطأ",
        description: language === 'en' ? "All fields are required" : language === 'fr' ? "Tous les champs sont obligatoires" : "جميع الحقول مطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    if (editingItem) {
      setProverbs(proverbs.map(p => p.id === editingItem ? {...newProverb, id: editingItem} : p));
      toast({
        title: language === 'en' ? "Updated" : language === 'fr' ? "Mis à jour" : "تم التحديث",
        description: language === 'en' ? "Proverb updated successfully" : language === 'fr' ? "Proverbe mis à jour avec succès" : "تم تحديث المثل بنجاح"
      });
    } else {
      const newId = `p${Date.now()}`;
      setProverbs([...proverbs, { ...newProverb, id: newId }]);
      toast({
        title: language === 'en' ? "Added" : language === 'fr' ? "Ajouté" : "تمت الإضافة",
        description: language === 'en' ? "New proverb added" : language === 'fr' ? "Nouveau proverbe ajouté" : "تمت إضافة مثل جديد"
      });
    }
    
    setNewProverb({ original: "", translation: "", meaning: "" });
    setEditingItem(null);
    setProverbDialogOpen(false);
  };

  const handleEditProverb = (proverb: ProverbItem) => {
    setNewProverb({
      original: proverb.original,
      translation: proverb.translation,
      meaning: proverb.meaning
    });
    setEditingItem(proverb.id);
    setProverbDialogOpen(true);
  };

  const handleDeleteProverb = (id: string) => {
    setProverbs(proverbs.filter(p => p.id !== id));
    toast({
      title: language === 'en' ? "Deleted" : language === 'fr' ? "Supprimé" : "تم الحذف",
      description: language === 'en' ? "Proverb deleted" : language === 'fr' ? "Proverbe supprimé" : "تم حذف المثل"
    });
  };

  // Fonctions pour manipuler les poèmes
  const handleAddPoem = () => {
    if (!newPoem.title || !newPoem.content) {
      toast({
        title: language === 'en' ? "Error" : language === 'fr' ? "Erreur" : "خطأ",
        description: language === 'en' ? "All fields are required" : language === 'fr' ? "Tous les champs sont obligatoires" : "جميع الحقول مطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    if (editingItem) {
      setPoems(poems.map(p => p.id === editingItem ? {...newPoem, id: editingItem} : p));
      toast({
        title: language === 'en' ? "Updated" : language === 'fr' ? "Mis à jour" : "تم التحديث",
        description: language === 'en' ? "Poem updated successfully" : language === 'fr' ? "Poème mis à jour avec succès" : "تم تحديث القصيدة بنجاح"
      });
    } else {
      const newId = `poem${Date.now()}`;
      setPoems([...poems, { ...newPoem, id: newId }]);
      toast({
        title: language === 'en' ? "Added" : language === 'fr' ? "Ajouté" : "تمت الإضافة",
        description: language === 'en' ? "New poem added" : language === 'fr' ? "Nouveau poème ajouté" : "تمت إضافة قصيدة جديدة"
      });
    }
    
    setNewPoem({ title: "", content: "" });
    setEditingItem(null);
    setPoemDialogOpen(false);
  };

  const handleEditPoem = (poem: ContentItem) => {
    setNewPoem({
      title: poem.title,
      content: poem.content
    });
    setEditingItem(poem.id);
    setPoemDialogOpen(true);
  };

  const handleDeletePoem = (id: string) => {
    setPoems(poems.filter(p => p.id !== id));
    toast({
      title: language === 'en' ? "Deleted" : language === 'fr' ? "Supprimé" : "تم الحذف",
      description: language === 'en' ? "Poem deleted" : language === 'fr' ? "Poème supprimé" : "تم حذف القصيدة"
    });
  };

  // Fonctions pour manipuler les contes
  const handleAddTale = () => {
    if (!newTale.title || !newTale.content) {
      toast({
        title: language === 'en' ? "Error" : language === 'fr' ? "Erreur" : "خطأ",
        description: language === 'en' ? "All fields are required" : language === 'fr' ? "Tous les champs sont obligatoires" : "جميع الحقول مطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    if (editingItem) {
      setTales(tales.map(t => t.id === editingItem ? {...newTale, id: editingItem} : t));
      toast({
        title: language === 'en' ? "Updated" : language === 'fr' ? "Mis à jour" : "تم التحديث",
        description: language === 'en' ? "Tale updated successfully" : language === 'fr' ? "Conte mis à jour avec succès" : "تم تحديث الحكاية بنجاح"
      });
    } else {
      const newId = `tale${Date.now()}`;
      setTales([...tales, { ...newTale, id: newId }]);
      toast({
        title: language === 'en' ? "Added" : language === 'fr' ? "Ajouté" : "تمت الإضافة",
        description: language === 'en' ? "New tale added" : language === 'fr' ? "Nouveau conte ajouté" : "تمت إضافة حكاية جديدة"
      });
    }
    
    setNewTale({ title: "", content: "" });
    setEditingItem(null);
    setTaleDialogOpen(false);
  };

  const handleEditTale = (tale: ContentItem) => {
    setNewTale({
      title: tale.title,
      content: tale.content
    });
    setEditingItem(tale.id);
    setTaleDialogOpen(true);
  };

  const handleDeleteTale = (id: string) => {
    setTales(tales.filter(t => t.id !== id));
    toast({
      title: language === 'en' ? "Deleted" : language === 'fr' ? "Supprimé" : "تم الحذف",
      description: language === 'en' ? "Tale deleted" : language === 'fr' ? "Conte supprimé" : "تم حذف الحكاية"
    });
  };

  // Fonctions pour manipuler les jeux
  const handleAddGame = () => {
    if (!newGame.name || !newGame.description) {
      toast({
        title: language === 'en' ? "Error" : language === 'fr' ? "Erreur" : "خطأ",
        description: language === 'en' ? "All fields are required" : language === 'fr' ? "Tous les champs sont obligatoires" : "جميع الحقول مطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    if (editingItem) {
      setGames(games.map(g => g.id === editingItem ? {...newGame, id: editingItem} : g));
      toast({
        title: language === 'en' ? "Updated" : language === 'fr' ? "Mis à jour" : "تم التحديث",
        description: language === 'en' ? "Game updated successfully" : language === 'fr' ? "Jeu mis à jour avec succès" : "تم تحديث اللعبة بنجاح"
      });
    } else {
      const newId = `game${Date.now()}`;
      setGames([...games, { ...newGame, id: newId }]);
      toast({
        title: language === 'en' ? "Added" : language === 'fr' ? "Ajouté" : "تمت الإضافة",
        description: language === 'en' ? "New game added" : language === 'fr' ? "Nouveau jeu ajouté" : "تمت إضافة لعبة جديدة"
      });
    }
    
    setNewGame({ name: "", description: "" });
    setEditingItem(null);
    setGameDialogOpen(false);
  };

  const handleEditGame = (game: GameItem) => {
    setNewGame({
      name: game.name,
      description: game.description
    });
    setEditingItem(game.id);
    setGameDialogOpen(true);
  };

  const handleDeleteGame = (id: string) => {
    setGames(games.filter(g => g.id !== id));
    toast({
      title: language === 'en' ? "Deleted" : language === 'fr' ? "Supprimé" : "تم الحذف",
      description: language === 'en' ? "Game deleted" : language === 'fr' ? "Jeu supprimé" : "تم حذف اللعبة"
    });
  };

  // Fonctions pour manipuler les croyances
  const handleAddBelief = () => {
    if (!newBelief.name || !newBelief.description || !newBelief.category) {
      toast({
        title: language === 'en' ? "Error" : language === 'fr' ? "Erreur" : "خطأ",
        description: language === 'en' ? "All fields are required" : language === 'fr' ? "Tous les champs sont obligatoires" : "جميع الحقول مطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    if (editingItem) {
      setBeliefs(beliefs.map(b => b.id === editingItem ? {...newBelief, id: editingItem} : b));
      toast({
        title: language === 'en' ? "Updated" : language === 'fr' ? "Mis à jour" : "تم التحديث",
        description: language === 'en' ? "Belief updated successfully" : language === 'fr' ? "Croyance mise à jour avec succès" : "تم تحديث المعتقد بنجاح"
      });
    } else {
      const newId = `belief${Date.now()}`;
      setBeliefs([...beliefs, { ...newBelief, id: newId }]);
      toast({
        title: language === 'en' ? "Added" : language === 'fr' ? "Ajouté" : "تمت الإضافة",
        description: language === 'en' ? "New belief added" : language === 'fr' ? "Nouvelle croyance ajoutée" : "تمت إضافة معتقد جديد"
      });
    }
    
    setNewBelief({ category: "spiritual", name: "", description: "" });
    setEditingItem(null);
    setBeliefDialogOpen(false);
  };

  const handleEditBelief = (belief: BeliefItem) => {
    setNewBelief({
      category: belief.category,
      name: belief.name,
      description: belief.description
    });
    setEditingItem(belief.id);
    setBeliefDialogOpen(true);
  };

  const handleDeleteBelief = (id: string) => {
    setBeliefs(beliefs.filter(b => b.id !== id));
    toast({
      title: language === 'en' ? "Deleted" : language === 'fr' ? "Supprimé" : "تم الحذف",
      description: language === 'en' ? "Belief deleted" : language === 'fr' ? "Croyance supprimée" : "تم حذف المعتقد"
    });
  };

  // Fonction pour obtenir les traductions des onglets
  const getTabTranslation = (key: string) => {
    if (language === 'en') {
      switch (key) {
        case "proverbs": return "Proverbs";
        case "poetry": return "Poetry";
        case "tales": return "Tales";
        case "games": return "Games";
        case "beliefs": return "Beliefs";
        default: return key;
      }
    } else if (language === 'ar') {
      switch (key) {
        case "proverbs": return "الأمثال";
        case "poetry": return "الشعر";
        case "tales": return "الحكايات";
        case "games": return "الألعاب";
        case "beliefs": return "المعتقدات";
        default: return key;
      }
    } else {
      switch (key) {
        case "proverbs": return "Proverbes";
        case "poetry": return "Poésie";
        case "tales": return "Contes";
        case "games": return "Jeux";
        case "beliefs": return "Croyances";
        default: return key;
      }
    }
  };

  return (
    <div className="container mx-auto py-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6 text-sahara-brown text-center">
        {language === 'en' 
          ? "Cultural Heritage Dashboard" 
          : language === 'fr' 
          ? "Tableau de bord du Patrimoine Culturel" 
          : "لوحة تحكم التراث الثقافي"}
      </h1>

      <Tabs defaultValue="proverbs" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="proverbs" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {getTabTranslation("proverbs")}
          </TabsTrigger>
          <TabsTrigger value="poetry" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            {getTabTranslation("poetry")}
          </TabsTrigger>
          <TabsTrigger value="tales" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            {getTabTranslation("tales")}
          </TabsTrigger>
          <TabsTrigger value="games" className="flex items-center gap-2">
            <Gamepad className="h-4 w-4" />
            {getTabTranslation("games")}
          </TabsTrigger>
          <TabsTrigger value="beliefs" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {getTabTranslation("beliefs")}
          </TabsTrigger>
        </TabsList>
        
        {/* Contenu pour les proverbes */}
        <TabsContent value="proverbs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sahara-brown">
              {getTabTranslation("proverbs")}
            </h2>
            <Dialog open={proverbDialogOpen} onOpenChange={setProverbDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setNewProverb({ original: "", translation: "", meaning: "" });
                    setEditingItem(null);
                  }}
                  className="bg-sahara-orange hover:bg-sahara-orange/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {language === 'en' ? "Add Proverb" : language === 'fr' ? "Ajouter un proverbe" : "إضافة مثل"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem 
                      ? language === 'en' ? "Edit Proverb" : language === 'fr' ? "Modifier le proverbe" : "تعديل المثل"
                      : language === 'en' ? "Add New Proverb" : language === 'fr' ? "Ajouter un nouveau proverbe" : "إضافة مثل جديد"
                    }
                  </DialogTitle>
                  <DialogDescription>
                    {language === 'en' 
                      ? "Fill in the details of the proverb below." 
                      : language === 'fr' 
                      ? "Remplissez les détails du proverbe ci-dessous." 
                      : "املأ تفاصيل المثل أدناه."
                    }
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="original" className="text-right">
                      {language === 'en' ? "Original" : language === 'fr' ? "Original" : "الأصلي"}
                    </Label>
                    <Input
                      id="original"
                      value={newProverb.original}
                      onChange={(e) => setNewProverb({...newProverb, original: e.target.value})}
                      className="col-span-3"
                      dir="rtl"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="translation" className="text-right">
                      {language === 'en' ? "Translation" : language === 'fr' ? "Traduction" : "الترجمة"}
                    </Label>
                    <Input
                      id="translation"
                      value={newProverb.translation}
                      onChange={(e) => setNewProverb({...newProverb, translation: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="meaning" className="text-right">
                      {language === 'en' ? "Meaning" : language === 'fr' ? "Signification" : "المعنى"}
                    </Label>
                    <Input
                      id="meaning"
                      value={newProverb.meaning}
                      onChange={(e) => setNewProverb({...newProverb, meaning: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleAddProverb}
                    className="bg-sahara-orange hover:bg-sahara-orange/90"
                  >
                    {editingItem 
                      ? language === 'en' ? "Update" : language === 'fr' ? "Mettre à jour" : "تحديث"
                      : language === 'en' ? "Add" : language === 'fr' ? "Ajouter" : "إضافة"
                    }
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === 'en' ? "Original" : language === 'fr' ? "Original" : "الأصلي"}</TableHead>
                <TableHead>{language === 'en' ? "Translation" : language === 'fr' ? "Traduction" : "الترجمة"}</TableHead>
                <TableHead>{language === 'en' ? "Meaning" : language === 'fr' ? "Signification" : "المعنى"}</TableHead>
                <TableHead className="w-[100px]">{language === 'en' ? "Actions" : language === 'fr' ? "Actions" : "إجراءات"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proverbs.map((proverb) => (
                <TableRow key={proverb.id}>
                  <TableCell dir="rtl">{proverb.original}</TableCell>
                  <TableCell>{proverb.translation}</TableCell>
                  <TableCell>{proverb.meaning}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditProverb(proverb)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteProverb(proverb.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Contenu pour la poésie */}
        <TabsContent value="poetry" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sahara-brown">
              {getTabTranslation("poetry")}
            </h2>
            <Dialog open={poemDialogOpen} onOpenChange={setPoemDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setNewPoem({ title: "", content: "" });
                    setEditingItem(null);
                  }}
                  className="bg-sahara-orange hover:bg-sahara-orange/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {language === 'en' ? "Add Poem" : language === 'fr' ? "Ajouter un poème" : "إضافة قصيدة"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem 
                      ? language === 'en' ? "Edit Poem" : language === 'fr' ? "Modifier le poème" : "تعديل القصيدة"
                      : language === 'en' ? "Add New Poem" : language === 'fr' ? "Ajouter un nouveau poème" : "إضافة قصيدة جديدة"
                    }
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="poem-title" className="text-right">
                      {language === 'en' ? "Title" : language === 'fr' ? "Titre" : "العنوان"}
                    </Label>
                    <Input
                      id="poem-title"
                      value={newPoem.title}
                      onChange={(e) => setNewPoem({...newPoem, title: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="poem-content" className="text-right">
                      {language === 'en' ? "Content" : language === 'fr' ? "Contenu" : "المحتوى"}
                    </Label>
                    <Textarea
                      id="poem-content"
                      value={newPoem.content}
                      onChange={(e) => setNewPoem({...newPoem, content: e.target.value})}
                      className="col-span-3"
                      rows={6}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleAddPoem}
                    className="bg-sahara-orange hover:bg-sahara-orange/90"
                  >
                    {editingItem 
                      ? language === 'en' ? "Update" : language === 'fr' ? "Mettre à jour" : "تحديث"
                      : language === 'en' ? "Add" : language === 'fr' ? "Ajouter" : "إضافة"
                    }
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {poems.map((poem) => (
              <Card key={poem.id}>
                <CardHeader>
                  <CardTitle>{poem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{poem.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPoem(poem)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    {language === 'en' ? "Edit" : language === 'fr' ? "Modifier" : "تعديل"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePoem(poem.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {language === 'en' ? "Delete" : language === 'fr' ? "Supprimer" : "حذف"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contenu pour les contes */}
        <TabsContent value="tales" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sahara-brown">
              {getTabTranslation("tales")}
            </h2>
            <Dialog open={taleDialogOpen} onOpenChange={setTaleDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setNewTale({ title: "", content: "" });
                    setEditingItem(null);
                  }}
                  className="bg-sahara-orange hover:bg-sahara-orange/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {language === 'en' ? "Add Tale" : language === 'fr' ? "Ajouter un conte" : "إضافة حكاية"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem 
                      ? language === 'en' ? "Edit Tale" : language === 'fr' ? "Modifier le conte" : "تعديل الحكاية"
                      : language === 'en' ? "Add New Tale" : language === 'fr' ? "Ajouter un nouveau conte" : "إضافة حكاية جديدة"
                    }
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tale-title" className="text-right">
                      {language === 'en' ? "Title" : language === 'fr' ? "Titre" : "العنوان"}
                    </Label>
                    <Input
                      id="tale-title"
                      value={newTale.title}
                      onChange={(e) => setNewTale({...newTale, title: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tale-content" className="text-right">
                      {language === 'en' ? "Content" : language === 'fr' ? "Contenu" : "المحتوى"}
                    </Label>
                    <Textarea
                      id="tale-content"
                      value={newTale.content}
                      onChange={(e) => setNewTale({...newTale, content: e.target.value})}
                      className="col-span-3"
                      rows={6}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleAddTale}
                    className="bg-sahara-orange hover:bg-sahara-orange/90"
                  >
                    {editingItem 
                      ? language === 'en' ? "Update" : language === 'fr' ? "Mettre à jour" : "تحديث"
                      : language === 'en' ? "Add" : language === 'fr' ? "Ajouter" : "إضافة"
                    }
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {tales.map((tale) => (
              <Card key={tale.id}>
                <CardHeader>
                  <CardTitle>{tale.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{tale.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditTale(tale)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    {language === 'en' ? "Edit" : language === 'fr' ? "Modifier" : "تعديل"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTale(tale.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {language === 'en' ? "Delete" : language === 'fr' ? "Supprimer" : "حذف"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contenu pour les jeux */}
        <TabsContent value="games" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sahara-brown">
              {getTabTranslation("games")}
            </h2>
            <Dialog open={gameDialogOpen} onOpenChange={setGameDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setNewGame({ name: "", description: "" });
                    setEditingItem(null);
                  }}
                  className="bg-sahara-orange hover:bg-sahara-orange/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {language === 'en' ? "Add Game" : language === 'fr' ? "Ajouter un jeu" : "إضافة لعبة"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem 
                      ? language === 'en' ? "Edit Game" : language === 'fr' ? "Modifier le jeu" : "تعديل اللعبة"
                      : language === 'en' ? "Add New Game" : language === 'fr' ? "Ajouter un nouveau jeu" : "إضافة لعبة جديدة"
                    }
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="game-name" className="text-right">
                      {language === 'en' ? "Name" : language === 'fr' ? "Nom" : "الاسم"}
                    </Label>
                    <Input
                      id="game-name"
                      value={newGame.name}
                      onChange={(e) => setNewGame({...newGame, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="game-description" className="text-right">
                      {language === 'en' ? "Description" : language === 'fr' ? "Description" : "الوصف"}
                    </Label>
                    <Textarea
                      id="game-description"
                      value={newGame.description}
                      onChange={(e) => setNewGame({...newGame, description: e.target.value})}
                      className="col-span-3"
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleAddGame}
                    className="bg-sahara-orange hover:bg-sahara-orange/90"
                  >
                    {editingItem 
                      ? language === 'en' ? "Update" : language === 'fr' ? "Mettre à jour" : "تحديث"
                      : language === 'en' ? "Add" : language === 'fr' ? "Ajouter" : "إضافة"
                    }
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {games.map((game) => (
              <Card key={game.id}>
                <CardHeader>
                  <CardTitle>{game.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{game.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditGame(game)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    {language === 'en' ? "Edit" : language === 'fr' ? "Modifier" : "تعديل"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteGame(game.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {language === 'en' ? "Delete" : language === 'fr' ? "Supprimer" : "حذف"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contenu pour les croyances */}
        <TabsContent value="beliefs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sahara-brown">
              {getTabTranslation("beliefs")}
            </h2>
            <Dialog open={beliefDialogOpen} onOpenChange={setBeliefDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setNewBelief({ category: "spiritual", name: "", description: "" });
                    setEditingItem(null);
                  }}
                  className="bg-sahara-orange hover:bg-sahara-orange/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {language === 'en' ? "Add Belief" : language === 'fr' ? "Ajouter une croyance" : "إضافة معتقد"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem 
                      ? language === 'en' ? "Edit Belief" : language === 'fr' ? "Modifier la croyance" : "تعديل المعتقد"
                      : language === 'en' ? "Add New Belief" : language === 'fr' ? "Ajouter une nouvelle croyance" : "إضافة معتقد جديد"
                    }
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="belief-category" className="text-right">
                      {language === 'en' ? "Category" : language === 'fr' ? "Catégorie" : "الفئة"}
                    </Label>
                    <select
                      id="belief-category"
                      value={newBelief.category}
                      onChange={(e) => setNewBelief({...newBelief, category: e.target.value})}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="spiritual">
                        {language === 'en' ? "Spiritual" : language === 'fr' ? "Spirituel" : "روحي"}
                      </option>
                      <option value="life">
                        {language === 'en' ? "Life Cycle" : language === 'fr' ? "Cycle de vie" : "دورة الحياة"}
                      </option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="belief-name" className="text-right">
                      {language === 'en' ? "Name" : language === 'fr' ? "Nom" : "الاسم"}
                    </Label>
                    <Input
                      id="belief-name"
                      value={newBelief.name}
                      onChange={(e) => setNewBelief({...newBelief, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="belief-description" className="text-right">
                      {language === 'en' ? "Description" : language === 'fr' ? "Description" : "الوصف"}
                    </Label>
                    <Textarea
                      id="belief-description"
                      value={newBelief.description}
                      onChange={(e) => setNewBelief({...newBelief, description: e.target.value})}
                      className="col-span-3"
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleAddBelief}
                    className="bg-sahara-orange hover:bg-sahara-orange/90"
                  >
                    {editingItem 
                      ? language === 'en' ? "Update" : language === 'fr' ? "Mettre à jour" : "تحديث"
                      : language === 'en' ? "Add" : language === 'fr' ? "Ajouter" : "إضافة"
                    }
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beliefs.map((belief) => (
              <Card key={belief.id}>
                <CardHeader>
                  <CardTitle>{belief.name}</CardTitle>
                  <CardDescription>
                    {belief.category === "spiritual" 
                      ? language === 'en' ? "Spiritual" : language === 'fr' ? "Spirituel" : "روحي"
                      : language === 'en' ? "Life Cycle" : language === 'fr' ? "Cycle de vie" : "دورة الحياة"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{belief.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditBelief(belief)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    {language === 'en' ? "Edit" : language === 'fr' ? "Modifier" : "تعديل"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteBelief(belief.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {language === 'en' ? "Delete" : language === 'fr' ? "Supprimer" : "حذف"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

