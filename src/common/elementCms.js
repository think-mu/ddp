import { 
  Button, 
  Select,
  Container,
  Header,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  Radio,
  RadioGroup,
  RadioButton,
  Divider,  
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Pagination,
  Dialog,
  TableColumn,
  Table,
  Option,
  CheckboxGroup,
  CheckboxButton,
  Checkbox,
  Message,
  Loading,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tree,
  Alert,
  Aside,
  MessageBox,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
 } from 'element-ui';

export default Vue => {
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Container)
  Vue.use(Header)
  Vue.use(Main)
  Vue.use(Footer)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(Submenu)
  Vue.use(Radio)
  Vue.use(RadioGroup)
  Vue.use(RadioButton)
  Vue.use(Divider)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Pagination)
  Vue.use(Dialog)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Option)
  Vue.use(Checkbox)
  Vue.use(CheckboxButton)
  Vue.use(CheckboxGroup)
  Vue.use(Loading.directive)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)
  Vue.use(Tree)
  Vue.use(Alert)
  Vue.use(Aside)
  Vue.use(Breadcrumb);
  Vue.use(BreadcrumbItem);
  Vue.use(Card);
  Vue.use(Row);
  Vue.use(Col);
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$message = Message
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm;
}
