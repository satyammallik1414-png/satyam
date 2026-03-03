'use server';
/**
 * @fileOverview A Genkit flow for generating heartfelt birthday messages and romantic reasons.
 *
 * - generateBirthdayContent - A function that handles the content generation process.
 * - GenerateBirthdayContentInput - The input type for the generateBirthdayContent function.
 * - GenerateBirthdayContentOutput - The return type for the generateBirthdayContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBirthdayContentInputSchema = z.object({
  theme: z.string().describe('The overall theme or tone for the birthday message and reasons (e.g., "eternal love", "journey together", "unwavering support").'),
  keywords: z.array(z.string()).describe('A list of specific keywords or phrases to incorporate into the message and reasons (e.g., "her smile", "our first date", "future adventures").').optional()
});
export type GenerateBirthdayContentInput = z.infer<typeof GenerateBirthdayContentInputSchema>;

const GenerateBirthdayContentOutputSchema = z.object({
  birthdayMessage: z.string().describe('A long, emotional, and heartfelt birthday message for a girlfriend.'),
  romanticReasons: z.array(z.string()).min(10).describe('An array of at least 10 distinct and romantic reasons why the girlfriend is loved. Each reason should be a separate string.')
});
export type GenerateBirthdayContentOutput = z.infer<typeof GenerateBirthdayContentOutputSchema>;

export async function generateBirthdayContent(input: GenerateBirthdayContentInput): Promise<GenerateBirthdayContentOutput> {
  return generateBirthdayContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBirthdayContentPrompt',
  input: {schema: GenerateBirthdayContentInputSchema},
  output: {schema: GenerateBirthdayContentOutputSchema},
  prompt: `You are a highly romantic poet and storyteller, crafting deeply emotional and personalized content for a beloved girlfriend's birthday.
Your task is to generate a heartfelt birthday message and a list of at least 10 distinct romantic reasons why she is loved.

Use the following theme and keywords to guide your creation:

Theme: {{{theme}}}
{{#if keywords}}
Keywords to incorporate: {{#each keywords}}- {{{this}}}
{{/each}}
{{else}}
No specific keywords provided, be creative and romantic.
{{/if}}

Ensure the output is in the specified JSON format, with a "birthdayMessage" field containing the long message and a "romanticReasons" field containing an array of strings, each representing a distinct reason. Make sure there are at least 10 reasons.`
});

const generateBirthdayContentFlow = ai.defineFlow(
  {
    name: 'generateBirthdayContentFlow',
    inputSchema: GenerateBirthdayContentInputSchema,
    outputSchema: GenerateBirthdayContentOutputSchema
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
