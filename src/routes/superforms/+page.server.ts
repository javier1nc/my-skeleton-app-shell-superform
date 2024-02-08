import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';

const userSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	employeeNumber: z.number().min(1)
});

export const load = async () => {
	// Server API:
	const form = await superValidate(userSchema);

	// Always return { form } in load and form actions.
	return { form };
};

// export const actions = {
// 	default: async (event) => {
// 		const form = await superValidate(event, userSchema);

// 		console.log(form);

// 		return { form };
// 	}
// };

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, userSchema);
		console.log('POST',form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		return { form };
	}
};
