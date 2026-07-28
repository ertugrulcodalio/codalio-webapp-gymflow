# frozen_string_literal: true
#
# Codalio preview host allowlist — regenerated on every orchestrator workspace hook.
# Do not edit; overwritten on preview start / setup when APP_PREVIEW_HOST_TEMPLATE is set.
#
if Rails.env.development?
  Rails.application.config.hosts << /.+\.preview\.codalio\.com/
end
