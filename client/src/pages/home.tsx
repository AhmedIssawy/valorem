import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Palette,
  Users,
  Briefcase,
  GraduationCap,
  Camera,
  Video,
  Sparkles,
  Wand2,
  Image,
  Play,
  BookOpen,
  Star,
  Heart,
  Eye,
  Settings,
  PlayCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { useSettings } from "@/contexts/SettingsContext";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useSettings();
  
  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  const skills = [
    "Adobe After Effects",
    "Adobe Premiere Pro",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Cinema 4D",
    "Blender",
    "DaVinci Resolve",
    "RunwayML",
    "Midjourney",
    "Stable Diffusion",
    "Adobe Firefly",
    "Luma AI",
    "Pika Labs",
    "Synthesia",
    "D-ID",
    "Adobe Character Animator",
    "Unreal Engine",
    "Unity 3D",
    "Figma",
    "Adobe XD",
    "CapCut",
    "Final Cut Pro",
  ];

  const projects = [
    {
      title: "فيلم دعائي للذكاء الاصطناعي السينمائي",
      description:
        "إنتاج فيلم دعائي بتقنيات الذكاء الاصطناعي المتقدمة يعرض إمكانيات المستقبل في صناعة السينما والإعلام",
      tech: ["RunwayML", "After Effects", "Midjourney", "Premiere Pro"],
      image: "/api/placeholder/600/400",
      category: "فيديو سينمائي",
    },
    {
      title: "مسلسل أنيميشن بالذكاء الاصطناعي",
      description:
        "إنتاج حلقات مسلسل أنيميشن كاملة باستخدام أدوات الذكاء الاصطناعي الحديثة مع قصة مشوقة وشخصيات متطورة",
      tech: [
        "Stable Diffusion",
        "Pika Labs",
        "Character Animator",
        "Cinema 4D",
      ],
      image: "/api/placeholder/600/400",
      category: "أنيميشن",
    },
    {
      title: "حملة إعلانية تفاعلية",
      description:
        "تصميم حملة إعلانية متكاملة تجمع بين التصميم التقليدي وتقنيات الذكاء الاصطناعي لإنتاج محتوى بصري مبهر",
      tech: ["Adobe Firefly", "Photoshop", "After Effects", "Figma"],
      image: "/api/placeholder/600/400",
      category: "إعلانات",
    },
    {
      title: "فيديو موسيقي فني",
      description:
        "إنتاج فيديو موسيقي بتقنيات بصرية متطورة يمزج بين الواقع والخيال باستخدام أحدث أدوات الذكاء الاصطناعي",
      tech: ["Luma AI", "DaVinci Resolve", "Blender", "RunwayML"],
      image: "/api/placeholder/600/400",
      category: "فيديو موسيقي",
    },
    {
      title: "وثائقي تعليمي تفاعلي",
      description:
        "إنتاج فيلم وثائقي تعليمي يشرح تطور الذكاء الاصطناعي في الفنون البصرية مع مؤثرات بصرية مذهلة",
      tech: ["D-ID", "Synthesia", "After Effects", "Premiere Pro"],
      image: "/api/placeholder/600/400",
      category: "وثائقي",
    },
    {
      title: "معرض فني رقمي",
      description:
        "تصميم معرض فني رقمي تفاعلي يعرض أعمال فنية تم إنتاجها بالذكاء الاصطناعي في بيئة ثلاثية الأبعاد",
      tech: ["Unreal Engine", "Midjourney", "Blender", "Unity 3D"],
      image: "/api/placeholder/600/400",
      category: "معرض رقمي",
    },
    {
      title: "مشروع الهوية البصرية الذكية",
      description:
        "تطوير نظام هوية بصرية متطور يستخدم الذكاء الاصطناعي لإنتاج تصاميم متنوعة ومتسقة للعلامات التجارية",
      tech: ["Adobe Illustrator", "Firefly", "Photoshop", "XD"],
      image: "/api/placeholder/600/400",
      category: "هوية بصرية",
    },
    {
      title: "فيلم قصير تجريبي",
      description:
        "إنتاج فيلم قصير تجريبي يستكشف حدود الإبداع البصري باستخدام تقنيات الذكاء الاصطناعي المتطورة",
      tech: ["RunwayML", "Stable Diffusion", "After Effects", "Cinema 4D"],
      image: "/api/placeholder/600/400",
      category: "فيلم تجريبي",
    },
  ];

  const experiences = [
    {
      company: "استوديو الإبداع السينمائي",
      position: "مدير الإنتاج الإبداعي",
      period: "2023 - حتى الآن",
      description:
        "قيادة فريق الإنتاج الإبداعي وتطوير مشاريع سينمائية متطورة باستخدام أحدث تقنيات الذكاء الاصطناعي والإنتاج الرقمي المتقدم",
      achievements: [
        "إنتاج أكثر من 50 مشروع سينمائي وإعلاني",
        "تطوير منهجيات جديدة للإنتاج بالذكاء الاصطناعي",
        "قيادة ورش عمل متخصصة في السينما الذكية",
      ],
    },
    {
      company: "وكالة الإعلان الرقمي المتطورة",
      position: "كبير المصممين البصريين",
      period: "2021 - 2023",
      description:
        "تطوير الحملات الإعلانية المتطورة والمحتوى البصري المبتكر للعلامات التجارية الكبرى مع التركيز على دمج التقنيات الحديثة",
      achievements: [
        "تصميم أكثر من 200 حملة إعلانية ناجحة",
        "زيادة معدلات التفاعل بنسبة 300%",
        "الحصول على جوائز إقليمية في التصميم الإبداعي",
      ],
    },
    {
      company: "شركة الإنتاج الفني الشامل",
      position: "مصمم جرافيك أول",
      period: "2019 - 2021",
      description:
        "تطوير الهويات البصرية والمحتوى الإبداعي للشركات والمؤسسات مع التخصص في التصميم التفاعلي والمتحرك",
      achievements: [
        "إنجاز أكثر من 150 مشروع تصميم متنوع",
        "تطوير نظم هوية بصرية متكاملة",
        "بناء فريق عمل إبداعي متخصص",
      ],
    },
  ];

  const education = [
    {
      degree: "ماجستير الفنون البصرية الرقمية",
      university: "جامعة الفنون التطبيقية",
      period: "2017 - 2019",
      grade: "امتياز مع مرتبة الشرف الأولى",
      specialization: "تخصص في السينما الرقمية والذكاء الاصطناعي",
    },
    {
      degree: "بكالوريوس التصميم الجرافيكي والوسائط المتعددة",
      university: "كلية الفنون الجميلة",
      period: "2013 - 2017",
      grade: "ممتاز مع مرتبة الشرف",
      specialization: "تخصص في التصميم التفاعلي والرسوم المتحركة",
    },
    {
      degree: "دبلوم متقدم في الإنتاج السينمائي",
      university: "معهد السينما والتلفزيون",
      period: "2018 - 2019",
      grade: "امتياز",
      specialization: "المؤثرات البصرية والمونتاج المتقدم",
    },
  ];

  const certifications = [
    "شهادة معتمدة في Adobe Creative Suite Master",
    "شهادة خبير في RunwayML للذكاء الاصطناعي السينمائي",
    "شهادة متقدمة في Midjourney وStable Diffusion",
    "شهادة مدرب معتمد في Cinema 4D وBlender",
    "شهادة مطور محتوى من أكاديمية الفنون الرقمية",
    "شهادة متخصص في Unreal Engine للإنتاج السينمائي",
    "شهادة خبير في DaVinci Resolve للمونتاج الاحترافي",
    "شهادة معتمدة في إنتاج الواقع الافتراضي والمعزز",
  ];

  const courseInfo = {
    title: "دورة الذكاء الاصطناعي السينمائي الشاملة",
    description:
      "دورة تدريبية متكاملة تغطي جميع جوانب استخدام الذكاء الاصطناعي في الإنتاج السينمائي والبصري",
    duration: "120 ساعة تدريبية",
    modules: 16,
    students: 2500,
    rating: 4.9,
    features: [
      "تعلم أحدث أدوات الذكاء الاصطناعي في السينما",
      "ورش عملية لإنتاج أفلام قصيرة بالـ AI",
      "مشاريع حقيقية مع عملاء فعليين",
      "شهادة معتمدة دولياً",
      "دعم فني مستمر لمدة سنة كاملة",
      "مجتمع حصري للمتدربين والخريجين",
    ],
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="flex justify-between items-center pl-5 pr-6 py-5">
          <nav className="flex justify-between items-center w-full">
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Valorem
          </button>
            <div className="flex items-center space-x-8 space-x-reverse">
              <button
                onClick={() => navigate('/settings')}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={t('settings')}
              >
                <Settings className="h-5 w-5 text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors"
              >
                {t('about')}
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors"
              >
                {t('skills.title')}
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors"
              >
                {t('projects.title')}
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors"
              >
                {t('courses')}
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors"
              >
                {t('experience.title')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors"
              >
                {t('contact')}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-right space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white leading-tight">
                  {t('hero.title')}
                </h1>
                <h2 className="text-2xl md:text-3xl text-purple-600 dark:text-purple-400 font-medium">
                  {t('hero.subtitle')}
                </h2>
                <h3 className="text-xl text-amber-600 dark:text-amber-400 font-medium">
                  {t('hero.specialization')}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  {t('hero.description')}
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Mail className="ml-2 h-4 w-4" />
                  {t('hero.buttons.contact')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <Play className="ml-2 h-4 w-4" />
                  {t('hero.buttons.portfolio')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amber-600 text-amber-600 hover:bg-amber-50"
                  onClick={() => navigate('/courses')}
                >
                  <BookOpen className="ml-2 h-4 w-4" />
                  {t('hero.buttons.course')}
                </Button>
              </div>
              <div className="flex justify-center md:justify-end gap-8 pt-6">
                {[
                  {
                    href: "https://www.linkedin.com/in/alimoamen/",
                    icon: <Linkedin className="h-6 w-6" />,
                    label: "LinkedIn",
                  },
                  {
                    href: "#",
                    icon: <Mail className="h-6 w-6" />,
                    label: "Email",
                  },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 
                 hover:bg-purple-100 dark:hover:bg-purple-900 
                 text-slate-600 dark:text-slate-400 
                 hover:text-purple-600 dark:hover:text-purple-400 
                 shadow-md transition-all duration-300 transform hover:scale-110"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <Avatar className="w-80 h-80 border-4 border-purple-200 shadow-2xl">
                  <AvatarImage
                    src="/api/placeholder/320/320"
                    alt="Ali Bmbozya"
                  />
                  <AvatarFallback className="text-4xl font-bold bg-purple-100 text-purple-800">
                    مف
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-4 -right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg">
                  <Palette className="h-8 w-8" />
                </div>
                <div className="absolute -top-4 -left-4 bg-amber-500 text-white p-3 rounded-full shadow-lg">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Course CTA Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto max-w-4xl px-6 relative">
          <div className="text-center text-white">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {t('course.subtitle')}
              </h2>
              <p className="text-xl md:text-2xl mb-2 font-medium text-purple-100">
                {t('course.badge')}
              </p>
              <p className="text-lg text-purple-50 max-w-3xl mx-auto leading-relaxed">
                {t('course.description')}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">+2500</div>
                <div className="text-sm">{t('course.stats.students')}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">{t('course.stats.hours')}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">{t('course.stats.practical')}</div>
              </div>
            </div>

            <Button 
              size="lg"
              onClick={() => navigate('/courses')}
              className="bg-white text-purple-700 hover:bg-purple-50 text-lg px-12 py-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 font-bold"
            >
              <PlayCircle className="ml-3 h-6 w-6" />
              {t('course.cta')}
              <Sparkles className="mr-3 h-6 w-6" />
            </Button>
            
            <p className="mt-6 text-purple-100 text-sm">
              {t('course.motivation')}
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/30 rounded-full blur-lg"></div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              {t('aboutSection.title')}
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('aboutSection.description')}
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('aboutSection.paragraph2')}
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('aboutSection.paragraph3')}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {t('aboutSection.stats.location')}
                  </span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {t('aboutSection.stats.age')}
                  </span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {t('aboutSection.stats.experience')}
                  </span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {t('aboutSection.stats.projects')}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span>{t('aboutSection.achievements.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        300+
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {t('aboutSection.achievements.completed')}
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        150+
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {t('aboutSection.achievements.satisfied')}
                      </div>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">
                        2500+
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {t('aboutSection.achievements.trainees')}
                      </div>
                    </div>
                    <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-rose-600">
                        15+
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {t('aboutSection.achievements.awards')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('aboutSection.certifications.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <Award className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl mt-5 md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              {t('skills.title')}
            </h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t('skills.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-20 items-stretch">
            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center justify-center space-x-3 space-x-reverse text-xl">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Palette className="h-6 w-6 text-purple-600" />
                  </div>
                  <span>{t('skills.categories.basic')}</span>
                </CardTitle>
                <CardDescription className="text-center text-base mt-3">
                  {t('skills.categories.basicDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {skills.slice(0, 12).map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 space-x-reverse p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200 min-h-[44px]"
                    >
                      <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-tight">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center justify-center space-x-3 space-x-reverse text-xl">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                    <Wand2 className="h-6 w-6 text-amber-600" />
                  </div>
                  <span>{t('skills.categories.ai')}</span>
                </CardTitle>
                <CardDescription className="text-center text-base mt-3">
                  {t('skills.categories.aiDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {skills.slice(12).map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 space-x-reverse p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors duration-200 min-h-[44px]"
                    >
                      <div className="w-3 h-3 bg-amber-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-tight">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Video className="h-7 w-7 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-xl">{t('skills.sections.cinema.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">
                      {t('skills.sections.cinema.editing')}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {t('skills.levels.expert')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">
                      {t('skills.sections.cinema.effects')}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {t('skills.levels.advanced')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">
                      {t('skills.sections.cinema.cinematography')}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {t('skills.levels.advanced')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">{t('skills.sections.cinema.colorGrading')}</span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {t('skills.levels.expert')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Image className="h-7 w-7 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-xl">{t('skills.sections.graphic.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">{t('skills.sections.graphic.identity')}</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {t('skills.levels.expert')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">{t('skills.sections.graphic.typography')}</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {t('skills.levels.advanced')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">{t('skills.sections.graphic.animation')}</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {t('skills.levels.expert')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">
                      {t('skills.sections.graphic.interactive')}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {t('skills.levels.advanced')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="text-xl">{t('skills.sections.ai.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">
                      {t('skills.sections.ai.imageGeneration')}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    >
                      {t('skills.levels.expert')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">
                      {t('skills.sections.ai.videoProduction')}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    >
                      {t('skills.levels.advanced')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">
                      {t('skills.sections.ai.training')}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    >
                      {t('skills.levels.expert')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-h-[52px]">
                    <span className="text-sm font-medium">{t('skills.sections.ai.contentDevelopment')}</span>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    >
                      {t('skills.levels.advanced')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mt-5 font-bold text-slate-800 dark:text-white mb-4">
              {t('projects.title')}
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-4"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 via-blue-50 to-amber-100 dark:from-purple-900 dark:via-blue-900 dark:to-amber-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-amber-500/20"></div>
                  <div className="relative z-10 text-center">
                    {index % 4 === 0 && (
                      <Video className="h-16 w-16 text-purple-600 mx-auto mb-2" />
                    )}
                    {index % 4 === 1 && (
                      <Camera className="h-16 w-16 text-blue-600 mx-auto mb-2" />
                    )}
                    {index % 4 === 2 && (
                      <Palette className="h-16 w-16 text-green-600 mx-auto mb-2" />
                    )}
                    {index % 4 === 3 && (
                      <Sparkles className="h-16 w-16 text-amber-600 mx-auto mb-2" />
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-right leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        <Eye className="ml-1 h-4 w-4" />
                        {t('projects.watch')}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Heart className="ml-1 h-4 w-4" />
                        {t('projects.projectDetails')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 mb-7">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              <Play className="ml-2  h-4 w-4" />
              {t('projects.viewAll')}
            </Button>
          </div>
        </div>
      </section>

      {/* Course Section */}
      <section
        id="course"
        className="py-16 md:py-20 bg-gradient-to-br from-purple-50 to-amber-50 dark:from-purple-900/20 dark:to-amber-900/20"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              {t('course.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-amber-600 mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t('course.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl md:text-2xl text-center text-slate-800 dark:text-white">
                    {courseInfo.title}
                  </CardTitle>
                  <CardDescription className="text-center text-base md:text-lg text-slate-600 dark:text-slate-400 mt-2">
                    {courseInfo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-4 md:p-6 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-center min-h-[100px] flex flex-col justify-center">
                      <div className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {courseInfo.duration}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {t('course.duration')}
                      </div>
                    </div>
                    <div className="p-4 md:p-6 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-center min-h-[100px] flex flex-col justify-center">
                      <div className="text-xl md:text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {courseInfo.modules}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {t('course.modules')}
                      </div>
                    </div>
                    <div className="p-4 md:p-6 bg-green-100 dark:bg-green-900/30 rounded-xl text-center min-h-[100px] flex flex-col justify-center">
                      <div className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                        {courseInfo.students}+
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {t('course.students')}
                      </div>
                    </div>
                    <div className="p-4 md:p-6 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-center min-h-[100px] flex flex-col justify-center">
                      <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                        <Star className="h-5 w-5" />
                        {courseInfo.rating}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {t('course.rating')}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={() => navigate('/courses')}
                    >
                      <BookOpen className="ml-2 h-5 w-5" />
                      {t('course.cta')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-white mb-6">
                {t('course.features.title')}
              </h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {courseInfo.features.map((feature, index) => (
                  <Card
                    key={index}
                    className="border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                          {feature}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-lg">
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg md:text-xl font-bold mb-2">{t('course.offer.title')}</h4>
                  <p className="mb-4 text-purple-100">{t('course.offer.description')}</p>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-purple-700 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => navigate('/courses')}
                  >
                    {t('course.offer.cta')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              {t('experience.title')}
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-8 flex items-center">
                <Briefcase className="ml-3 h-6 w-6 text-purple-600" />
                {t('experience.career')}
              </h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <Card key={index} className="border-r-4 border-r-purple-600">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {exp.position}
                          </CardTitle>
                          <CardDescription className="text-purple-600 font-medium">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="border-purple-200">
                          {exp.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {exp.description}
                      </p>
                      {exp.achievements && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-700 dark:text-slate-200">
                            الإنجازات الرئيسية:
                          </h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="flex items-center space-x-2 space-x-reverse text-sm text-slate-600 dark:text-slate-300"
                              >
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-8 flex items-center">
                <GraduationCap className="ml-3 h-6 w-6 text-purple-600" />
                {t('experience.education')}
              </h3>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <Card key={index} className="border-r-4 border-r-green-600">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {edu.degree}
                          </CardTitle>
                          <CardDescription className="text-green-600 font-medium">
                            {edu.university}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="border-green-200">
                          {edu.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Award className="h-4 w-4 text-green-600" />
                        <span className="text-slate-600 dark:text-slate-300 font-medium">
                          {edu.grade}
                        </span>
                      </div>
                      {edu.specialization && (
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Star className="h-4 w-4 text-amber-600" />
                          <span className="text-slate-600 dark:text-slate-300">
                            {edu.specialization}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              {t('servicesSection.title')}
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-4"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('servicesSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-purple-500">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>الإنتاج السينمائي الذكي</CardTitle>
                <CardDescription className="text-center">
                  إنتاج أفلام ومقاطع فيديو احترافية باستخدام أحدث تقنيات الذكاء
                  الاصطناعي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  RunwayML، Pika Labs، والمونتاج المتقدم لإنتاج محتوى بصري مذهل
                  يجمع بين الإبداع والتقنية
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-amber-500">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle>توليد الصور بالذكاء الاصطناعي</CardTitle>
                <CardDescription className="text-center">
                  إنشاء صور فنية مذهلة وتصاميم إبداعية باستخدام Midjourney
                  وStable Diffusion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  تصميم شخصيات، مناظر طبيعية، وأعمال فنية رقمية باستخدام تقنيات
                  الذكاء الاصطناعي المتقدمة
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-green-500">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>التصميم الجرافيكي المتقدم</CardTitle>
                <CardDescription className="text-center">
                  تصميم الهويات البصرية والمواد التسويقية الاحترافية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  لوجوهات، بروشورات، مواقع ويب، وحملات إعلانية متكاملة بأسلوب
                  إبداعي متميز
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-blue-500">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>الرسوم المتحركة والموشن جرافيك</CardTitle>
                <CardDescription className="text-center">
                  إنتاج رسوم متحركة احترافية ومؤثرات بصرية مبهرة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  After Effects، Cinema 4D، وBlender لإنتاج محتوى متحرك عالي
                  الجودة
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-rose-500">
              <CardHeader>
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-rose-600" />
                </div>
                <CardTitle>التدريب والاستشارات</CardTitle>
                <CardDescription className="text-center">
                  دورات تدريبية واستشارات متخصصة في الذكاء الاصطناعي الإبداعي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  ورش عمل، دورات تدريبية، واستشارات فردية لتطوير المهارات
                  الإبداعية والتقنية
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-indigo-500">
              <CardHeader>
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wand2 className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle>المؤثرات البصرية المتقدمة</CardTitle>
                <CardDescription className="text-center">
                  إنتاج مؤثرات بصرية سينمائية باستخدام أحدث التقنيات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  مؤثرات خاصة، تركيب المشاهد، والخدع البصرية للإنتاج السينمائي
                  والتلفزيوني
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              {t('testimonials.title')}
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Avatar className="w-16 h-16 mx-auto mb-4">
                  <AvatarImage src="/api/placeholder/64/64" />
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    سع
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">سعد الأحمدي</CardTitle>
                <CardDescription>
                  مدير إبداعي - وكالة الإعلان الرقمي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-4">
                  "محمد فنان حقيقي وخبير في مجاله. استطاع تحويل رؤيتنا إلى واقع
                  مذهل باستخدام الذكاء الاصطناعي. النتائج فاقت كل التوقعات
                  وحققنا نجاحاً كبيراً في حملتنا الإعلانية."
                </p>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Avatar className="w-16 h-16 mx-auto mb-4">
                  <AvatarImage src="/api/placeholder/64/64" />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    فر
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">فاطمة الرشيد</CardTitle>
                <CardDescription>
                  متدربة - دورة الذكاء الاصطناعي السينمائي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-4">
                  "الدورة غيرت مسيرتي المهنية بالكامل! تعلمت كيفية استخدام
                  الذكاء الاصطناعي في الإنتاج البصري، واليوم أعمل في استوديو
                  إنتاج كبير. شكراً أستاذ محمد على هذه التجربة الرائعة."
                </p>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Avatar className="w-16 h-16 mx-auto mb-4">
                  <AvatarImage src="/api/placeholder/64/64" />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    كم
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">خالد المنصوري</CardTitle>
                <CardDescription>مؤسس استوديو الإنتاج الرقمي</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-4">
                  "تعاونت مع محمد في عدة مشاريع وكان دائماً يقدم نتائج
                  استثنائية. خبرته في دمج الذكاء الاصطناعي مع الإبداع التقليدي
                  جعلته المرجع الأول لنا في جميع مشاريعنا المهمة."
                </p>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              {t('contactSection.title')}
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-4"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('contactSection.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t('contactSection.info.title')}</CardTitle>
                  <CardDescription>{t('contactSection.info.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {t('contactSection.info.email')}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">
                        mohammed.artist@example.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {t('contactSection.info.phone')}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">
                        +971 55 123 4567
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {t('contactSection.info.location')}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">
                        {t('contactSection.info.locationValue')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-amber-500 text-white">
                <CardHeader>
                  <CardTitle className="text-white">
                    {t('contactSection.quickRegistration.title')}
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    {t('contactSection.quickRegistration.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      size="lg"
                      className="w-full bg-white text-purple-700 hover:bg-gray-100"
                    >
                      <BookOpen className="ml-2 h-5 w-5" />
                      {t('contactSection.quickRegistration.cta')}
                    </Button>
                    <div className="text-center text-sm text-purple-100">
                      {t('contactSection.quickRegistration.urgency')}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('contactSection.social.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4 space-x-reverse mb-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('contactSection.form.title')}</CardTitle>
                <CardDescription>
                  {t('contactSection.form.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {t('contactSection.form.name')}
                      </label>
                      <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-600 dark:bg-slate-800" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {t('contactSection.form.email')}
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-600 dark:bg-slate-800"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t('contactSection.form.service')}
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-600 dark:bg-slate-800">
                      <option>{t('contactSection.form.selectService')}</option>
                      <option>{t('contactSection.form.services.production')}</option>
                      <option>{t('contactSection.form.services.design')}</option>
                      <option>{t('contactSection.form.services.course')}</option>
                      <option>{t('contactSection.form.services.consultation')}</option>
                      <option>{t('contactSection.form.services.other')}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t('contactSection.form.message')}
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-600 dark:bg-slate-800 resize-none"
                      placeholder={t('contactSection.form.messagePlaceholder')}
                    ></textarea>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Mail className="ml-2 h-4 w-4" />
                    {t('contactSection.form.send')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-800 dark:bg-slate-950 text-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Palette className="ml-2 h-5 w-5 text-purple-400" />
                Ali Bmbozya
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                مصمم جرافيك ومبدع سينمائي متخصص في دمج الذكاء الاصطناعي مع الفن
                التقليدي لإنتاج محتوى بصري استثنائي
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">الخدمات</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="hover:text-white transition-colors text-left"
                  >
                    الإنتاج السينمائي الذكي
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('skills')}
                    className="hover:text-white transition-colors text-left"
                  >
                    التصميم الجرافيكي
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="hover:text-white transition-colors text-left"
                  >
                    المؤثرات البصرية
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/courses')}
                    className="hover:text-white transition-colors text-left"
                  >
                    التدريب والاستشارات
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="hover:text-white transition-colors text-left"
                  >
                    نبذة عني
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="hover:text-white text-4xl transition-colors text-left"
                  >
                    معرض الأعمال
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/courses')}
                    className="hover:text-white transition-colors text-left"
                  >
                    الدورة التدريبية
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="hover:text-white transition-colors text-left"
                  >
                    تواصل معي
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">تابعني</h3>
              <div className="flex space-x-4 space-x-reverse mb-4">
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Play className="h-5 w-5" />
                </a>
              </div>
              <div className="text-slate-300 text-sm">
                <p className="mb-1">📧 mohammed.artist@example.com</p>
                <p>📱 +971 55 123 4567</p>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} فالوريم. جميع الحقوق محفوظة.</p>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
