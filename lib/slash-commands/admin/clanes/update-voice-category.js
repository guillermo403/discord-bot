import { ChannelType, SlashCommandSubcommandBuilder } from "discord.js"
import logger from "../../../logger/logger.js"
import ClanesConfig from "../../../../config/clanes.config.js"
import logClanCommandToChannel from "../../../../utils/clanes/log-to-channel.js"
import { COLORS } from "../../../../enums/colors.js"

const UpdateVoiceCategoryCommand = {
	data: new SlashCommandSubcommandBuilder()
		.setName("updatevoicecategory")
		.setDescription("Actualiza la categoría de los canales de voz")
		.addChannelOption((option) => option
			.setName("categoria")
			.setDescription("Categoría de voz")
			.setRequired(true)
			.addChannelTypes(ChannelType.GuildCategory)
		),

	execute: async (interaction) => {
		const category = interaction.options.getChannel("categoria")

		try {
			const clanesConfig = await ClanesConfig.get()
			clanesConfig.voice_parent_id = category
			await ClanesConfig.set(clanesConfig)

			logger.info(`Voice category updated to '${category.name}' (${category.id})`)

			logClanCommandToChannel({
				userId: interaction.member.id,
				command: "/admin clanes updatevoicecategory",
				fields: [
					{ name: "Categoría", value: `<#${category.id}>` }
				],
				color: COLORS.blue
			})
			return {
				content: `✅ Categoría de voz actualizada a <#${category.id}>`
			}
		} catch (error) {
			logger.error("Error updating voice category")
			logger.error(error)
			return {
				content: "❌ Error al actualizar la categoría de voz"
			}
		}
	}
}

export default UpdateVoiceCategoryCommand
