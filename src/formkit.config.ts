// formkit.config.js
import {generateClasses} from '@formkit/themes'
import {defaultConfig} from '@formkit/vue'
import {createMultiStepPlugin} from '@formkit/addons'
import '@formkit/addons/css/multistep'

const config = defaultConfig({
	plugins: [createMultiStepPlugin()],
	classes: generateClasses({
		global: {
			help: ' mt-2 text-xs text-gray-500',
			message: 'text-red-600 mb-1 text-xs',
			messages: 'list-none p-0 mt-2 mb-0',
			wrapper: '$reset',
		},
	}),
})

export default config
