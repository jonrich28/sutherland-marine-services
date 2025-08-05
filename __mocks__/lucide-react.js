// Mock for lucide-react icons
const React = require('react');

// Create proper React components for icons
const createMockIcon = (name) => {
  const MockIcon = React.forwardRef((props, ref) => {
    return React.createElement('svg', { 
      ...props, 
      ref,
      'data-testid': `${name}-icon`,
      className: props.className || '',
      children: name
    });
  });
  MockIcon.displayName = name;
  return MockIcon;
};

// Create specific icon components
const Camera = createMockIcon('Camera');
const MessageSquare = createMockIcon('MessageSquare');
const Paperclip = createMockIcon('Paperclip');
const X = createMockIcon('X');
const Menu = createMockIcon('Menu');
const Bell = createMockIcon('Bell');
const User = createMockIcon('User');
const Settings = createMockIcon('Settings');
const Calendar = createMockIcon('Calendar');
const Clock = createMockIcon('Clock');
const ChevronDown = createMockIcon('ChevronDown');
const Wrench = createMockIcon('Wrench');
const Users = createMockIcon('Users');
const Boxes = createMockIcon('Boxes');
const Receipt = createMockIcon('Receipt');
const BarChart3 = createMockIcon('BarChart3');
const MoreVertical = createMockIcon('MoreVertical');
const ChevronRight = createMockIcon('ChevronRight');
const ChevronUp = createMockIcon('ChevronUp');
const ChevronLeft = createMockIcon('ChevronLeft');
const Plus = createMockIcon('Plus');
const Minus = createMockIcon('Minus');
const Edit = createMockIcon('Edit');
const Trash = createMockIcon('Trash');
const Search = createMockIcon('Search');
const Eye = createMockIcon('Eye');
const EyeOff = createMockIcon('EyeOff');
const MoreHorizontal = createMockIcon('MoreHorizontal');
const Download = createMockIcon('Download');
const Upload = createMockIcon('Upload');
const Check = createMockIcon('Check');
const XCircle = createMockIcon('XCircle');
const AlertCircle = createMockIcon('AlertCircle');
const HelpCircle = createMockIcon('HelpCircle');
const PlusCircle = createMockIcon('PlusCircle');
const CheckCircle = createMockIcon('CheckCircle');
const Sailboat = createMockIcon('Sailboat');
const KeyRound = createMockIcon('KeyRound');
const Shield = createMockIcon('Shield');
const HardHat = createMockIcon('HardHat');
const Bot = createMockIcon('Bot');
const Sparkles = createMockIcon('Sparkles');
const Circle = createMockIcon('Circle');
const PanelLeft = createMockIcon('PanelLeft');
const ArrowLeft = createMockIcon('ArrowLeft');
const ArrowRight = createMockIcon('ArrowRight');
const DollarSign = createMockIcon('DollarSign');
const ChevronsUpDown = createMockIcon('ChevronsUpDown');

module.exports = {
  Camera,
  MessageSquare,
  Paperclip,
  X,
  Menu,
  Bell,
  User,
  Settings,
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ChevronLeft,
  Plus,
  Minus,
  Edit,
  Trash,
  Search,
  Eye,
  EyeOff,
  MoreHorizontal,
  Download,
  Upload,
  Check,
  XCircle,
  AlertCircle,
  HelpCircle,
  PlusCircle,
  CheckCircle,
  Sailboat,
  KeyRound,
  Shield,
  HardHat,
  Bot,
  Sparkles,
  Circle,
  PanelLeft,
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Receipt,
  Users,
  Wrench,
  Boxes,
  BarChart3,
  MoreVertical,
  ChevronsUpDown,
  // Default export for when icons are imported differently
  __esModule: true,
  default: createMockIcon('DefaultIcon'),
};
