import TUIComponents, {
  TUIChat,
  TUIContact,
  TUIConversation,
  TUIGroup,
  TUISearch,
} from './components'
import { hideTUIChatFeatures } from './components/TUIChat/config'
// import { genTestUserSig } from './debug'
import TUIKit from './index.vue'
import Server from './server'

const TUIChatKit = new Server()
TUIChatKit.init()

export {
  // genTestUserSig,
  hideTUIChatFeatures,
  TUIChat,
  TUIChatKit,
  TUIComponents,
  TUIContact,
  TUIConversation,
  TUIGroup,
  TUIKit,
  TUISearch,
}
