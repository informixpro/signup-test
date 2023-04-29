<template>
	<section class="flex justify-center h-full py-10">
		<div class="max-w-xl w-full md:mt-24 mx-4">
			<div class="bg-white md:shadow-md mb-4 border md:border-0">
				<div class="bg-gray-100 px-4 py-4 text-center border-t-4 border-indigo-500 md:rounded-t">
					<h1 class="font-semibold">
						Title of the page
					</h1>
				</div>
				<div class="pt-6 px-4 md:px-8 pb-8 border-t space-y-12">
					<template v-if="!isSummary">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt semper mauris et
							feugiat. Morbi ornare eleifend tellus, semper tincidunt augue tincidunt et.
						</p>
						<FormKit
							v-slot="{ state: { valid } }"
							type="form"
							:actions="false"
							@submit="handleSubmit"
						>
							<FormKit
								type="multi-step"
								tab-style="progress"
								:hide-progress-labels="true"
								:allow-incomplete="false"
							>
								<FormKit type="step" name="amount">
									<FormKit
										type="text"
										label="Amount"
										name="amount"
										placeholder="Enter regular investment amount"
										help="Investment amount help message"
										validation="required|number"
									/>
								</FormKit>
								<FormKit type="step" name="name">
									<FormKit
										type="text"
										label="Name"
										name="name"
										placeholder="Enter your name"
										validation="required|minlength:3"
									/>
								</FormKit>
								<FormKit type="step" name="phone">
									<FormKit
										type="tel"
										label="Phone number"
										name="phone"
										placeholder="xxx-xxx-xxx"
										validation="required|matches:/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/"
										:validation-messages="{
    										matches: 'Phone number must be in the format xxx-xxx-xxx',
    									}"
									/>
								</FormKit>
								<FormKit type="step" name="email">
									<FormKit
										type="email"
										name="email"
										placeholder="Email address"
										validation="required|email"
									/>
								</FormKit>
								<FormKit type="step" name="idNumber">
									<FormKit
										type="text"
										label="ID number"
										name="idNumber"
										placeholder="Enter ID number"
										validation="required|number"
									/>
								</FormKit>
								<FormKit type="step" name="idCardNumber">
									<FormKit
										type="text"
										label="ID card number"
										name="idCardNumber"
										placeholder="Enter ID card number"
										validation="required|number"
									/>
								</FormKit>
								<FormKit type="step" name="address">
									<FormKit
										type="text"
										label="Address"
										name="address"
										placeholder="Enter your address"
										validation="required|minlength:3"
									/>
								</FormKit>
								<FormKit type="step" name="bankAccountNumber">
									<FormKit
										type="text"
										label="Bank accountg number"
										name="bankAccountNumber"
										placeholder="Enter bank accountg number"
										validation="required|number"
									/>
								</FormKit>
								<FormKit type="step" name="consent">
									<FormKit
										type="checkbox"
										label="Terms and Conditions"
										help="Do you agree to our terms of service?"
										name="consent"
										:value="false"
										validation="accepted"
										validation-visibility="dirty"
									/>
									<template #stepNext>
										<FormKit type="submit" :disabled="!valid" />
									</template>
								</FormKit>
							</FormKit>
						</FormKit>
					</template>
					<template v-else>
						<h2 class="font-semibold text-center">
							Summary
						</h2>
						<div class="space-y-6">
							<div
								v-for="(value, name, index) in user"
								:key="index"
							>
								<div class="font-bold text-sm">{{ capitalize(name) }}</div>
								<div>{{ value }}</div>
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {IUser, IExternalUser} from '../interface/User'
import {FormKitNode} from '@formkit/core'
import axios from "axios"

const isSummary = ref(false)
let externalUser = {} as IExternalUser

const capitalize = ((word: string): string => word.charAt(0).toUpperCase() + word.slice(1))

const getUserData = async (): Promise<any> => {
	try {
		const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users/1`)
		externalUser = data
	} catch (error: any) {
		console.log(error)
	}
};

const user = computed((): IUser => ({
	...externalUser,
	address: `${externalUser.address?.zipcode} ${externalUser.address?.city}, ${externalUser.address?.street} ${externalUser.address?.suite}`,
	company: externalUser.company?.name
}))

const handleSubmit = async (formData: any, node: FormKitNode): Promise<any> => {
	try {
		console.log("-> formData", formData);
		// const res = await axios.post('https://webhook.site/', formData)
		showSummary()
	} catch (error: any) {
		node.setErrors(error.formErrors, error.fieldErrors)
	}
}

const showSummary = async (): Promise<void> => {
	await getUserData()
	isSummary.value = true
}

</script>
