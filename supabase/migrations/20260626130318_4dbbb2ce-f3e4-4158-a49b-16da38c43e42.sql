
UPDATE observatorio_indicadores SET dados_publicado = jsonb_set(dados_publicado, '{num}', '"27"') WHERE id='7280a39a-04ff-4d48-9c25-c9234d4dcc87';
UPDATE observatorio_indicadores SET dados_publicado = jsonb_set(dados_publicado, '{num}', '"8"') WHERE id='163760af-c18e-4a13-8445-ecb1f5f931eb';
UPDATE observatorio_indicadores SET dados_publicado = jsonb_set(dados_publicado, '{num}', '"14"') WHERE id='d0541e9b-d47b-44b2-b302-26dd87913718';

UPDATE observatorio_categorias SET dados_publicado = jsonb_set(dados_publicado, '{titulo}', '"Exonerações a Pedido"') WHERE id='2e8c04d1-488a-4560-988d-3db15c1f8f59';
UPDATE observatorio_categorias SET dados_publicado = jsonb_set(dados_publicado, '{titulo}', '"Licenças de Interesse Particular (LIP)"') WHERE id='44eed64f-722b-40e9-8929-f9c31470cef3';
UPDATE observatorio_categorias SET dados_publicado = jsonb_set(dados_publicado, '{titulo}', '"Cedências e Requisições"') WHERE id='abfaa2c4-1c5c-4325-8944-95291b0db431';
