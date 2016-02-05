# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( lecture_list.js )
Rails.application.config.assets.precompile += %w( components/SheetEditor/entry.js )
Rails.application.config.assets.precompile += %w( sheets.js )
Rails.application.config.assets.precompile += %w( sheet_dashboard.js )
Rails.application.config.assets.precompile += %w( lecture_subscribe.js )
Rails.application.config.assets.precompile += %w( sheet_creator.js )
Rails.application.config.assets.precompile += %w( lecture_creator.js )
Rails.application.config.assets.precompile += %w( marked.js )
Rails.application.config.assets.precompile += %w( codemirror.css )
Rails.application.config.assets.precompile += %w( codemirror.js )
Rails.application.config.assets.precompile += %w( python_mode.js )
Rails.application.config.assets.precompile += %w( base16-light.css )