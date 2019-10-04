// bundles the child script together with the autofit plugin
import * as child from '../../src/child/child.js'
import autofit from '../../src/child/plugins/autofit'

autofit()
child.init()
