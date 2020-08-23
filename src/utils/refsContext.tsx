import {getContextHelpers, toObjectKeys} from 'ad-hok-utils'

import {RefsProps} from 'utils/refs'

const [addRefsContextProvider, addRefsContext] = getContextHelpers<RefsProps>(
  toObjectKeys(['refs', 'setRef']),
)

export {addRefsContextProvider, addRefsContext}
