REVOKE EXECUTE ON FUNCTION public.publish_field(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.publish_page(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.publish_snapshot() FROM anon;
REVOKE EXECUTE ON FUNCTION public.publish_cms_item(text, uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.publish_cms_all(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.discard_field_draft(text) FROM anon;