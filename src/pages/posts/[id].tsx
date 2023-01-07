import {
  AspectRatio,
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  HeadingProps,
  Stack,
  Text,
  TextProps,
} from '@chakra-ui/react';

import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { Layout } from '@/components/templates';
import NextImage from 'next/image';
import NextLink from 'next/link';
import ReactMarkdown from 'react-markdown';

const newTheme = {
  p: (props: TextProps) => {
    const { children } = props;
    return (
      <Text textAlign={'justify'} mb={4} fontSize={'xl'}>
        {children}
      </Text>
    );
  },
  h2: (props: HeadingProps) => {
    const { children } = props;
    return (
      <Heading as="h2" size={'md'} mb={2}>
        {children}
      </Heading>
    );
  },
};

function Post() {
  const md = `
  ## Teste de medicamento para tratamento da doença de Alzheimer
  O principal tópico do artigo é o teste de um medicamento chamado
  lecanemab para o tratamento da doença de Alzheimer precoce e os
  resultados de um ensaio clínico de fase 3 que estuda sua eficácia e
  segurança. 
  
  ## Desenho do ensaio clínico
  O ensaio envolveu a administração de lecanemab ou placebo
  a participantes com déficit cognitivo leve ou demência leve devido à
  doença de Alzheimer, e o ponto final principal foi a mudança na
  pontuação do Clinical Dementia Rating-Sum of Boxes (CDR-SB) após 18
  meses. Medidas secundárias de ponto final incluíram mudanças na
  carga amilóide em exames de PET, pontuações em avaliações cognitivas
  e funcionais e ocorrência de eventos adversos.

  ## Resultados do ensaio clínico
  Os resultados mostraram que o lecanemab estava associado a uma
  diminuição moderadamente menor em medidas de cognição e função em
  comparação com o placebo após 18 meses, bem como reduções em
  marcadores amilóide, mas também teve uma taxa maior de reações
  relacionadas à infusão e anormalidades de imagem relacionadas
  amilóide com edema ou efusões.

  ## Conclusão dos autores
  Os autores concluem que são necessários ensaios mais longos para
  determinar a eficácia e segurança a longo prazo do lecanemab na
  doença de Alzheimer precoce.
  `;
  return (
    <Layout
      title="Lecanemab: uma possível opção de tratamento para o mal de Alzheimer
    precoce?"
      description="O principal tópico do artigo é o teste de um medicamento chamado
    lecanemab para o tratamento da doença de Alzheimer precoce e os
    resultados de um ensaio clínico de fase 3 que estuda sua eficácia e
    segurança."
      keywords="lecanemab, alzheimer, doença de alzheimer, mal de alzheimer, doença de alzheimer precoce, mal de alzheimer precoce, tratamento, medicamento, ensaio clínico, fase 3, eficácia, segurança, déficit cognitivo leve, demência leve, clinical dementia rating, cdr, sum of boxes, cdr-sb, pet, avaliação cognitiva, avaliação funcional, eventos adversos, reações relacionadas à infusão, anormalidades de imagem relacionadas amilóide, edema, efusões, ensaios mais longos, eficácia a longo prazo"
      image=""
    >
      <Stack direction={['column', 'row']} spacing={6}>
        <Stack spacing={6}>
          <Heading as="h1" fontWeight={'black'}>
            Lecanemab: uma possível opção de tratamento para o mal de Alzheimer
            precoce?
          </Heading>
          <Divider display={['none', 'flex']} />
          <Stack>
            <Text fontSize={'sm'} fontWeight="normal">
              Fonte: The New England Journal of Medicine
            </Text>
            <Box>
              <Button
                as={NextLink}
                href="https://www.nejm.org/doi/full/10.1056/NEJMoa2212948"
                rightIcon={<HiOutlineExternalLink />}
              >
                Acessar referência
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Divider display={['flex', 'none']} />
        <Stack w="full">
          <AspectRatio ratio={1} position={'relative'}>
            <NextImage
              priority
              draggable={false}
              src={
                'https://snapxcdn.com/v2/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS8zMjM4MTcxMzhfMjM4NTcxMTczODI0OTA1MF85MTg1OTI4OTQ3NTQ3OTk0NDdfbi5qcGc_c3RwPWRzdC1qcGdfZTM1X3M2NDB4NjQwX3NoMC4wOCZfbmNfaHQ9c2NvbnRlbnQuY2RuaW5zdGFncmFtLmNvbSZfbmNfY2F0PTEwMiZfbmNfb2hjPVpnMkk5dG5xYVNrQVg5T3lBdlkmZWRtPUFKQmdacllCQUFBQSZjY2I9Ny01JmlnX2NhY2hlX2tleT1NekF4TURZMU9URTJPRE01TVRRd05ESXdNQSUzRCUzRC4yLWNjYjctNSZvaD0wMF9BZkIwUEJZc2RmM1JuaVU2TmFDY180bms4ZzMyVkcxWDdqLXl3clp5eks4TzB3Jm9lPTYzQkYxNzQwJl9uY19zaWQ9NzhjNjYyIiwiZmlsZW5hbWUiOiJTbmFwaW5zdGEuYXBwXzMyMzgxNzEzOF8yMzg1NzExNzM4MjQ5MDUwXzkxODU5Mjg5NDc1NDc5OTQ0N19uLmpwZyJ9._lad_CGikx03xosRvYxo6avEbYdeMiBdQe44mAUsfT0'
              }
              alt={'blog image'}
              fill
              style={{
                position: 'absolute',
                objectFit: 'cover',
              }}
            />
          </AspectRatio>
        </Stack>
      </Stack>
      <Divider my={6} />
      <Box>
        <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
          {md}
        </ReactMarkdown>
      </Box>
      <Divider mb={6} />
      <Stack>
        <HStack w="full " justify={'space-between'}>
          <Text fontSize={'sm'} fontWeight="normal">
            Fonte: The New England Journal of Medicine
          </Text>
          <Text fontSize={'sm'} fontStyle="italic">
            Criado em: {new Date('2021-08-31').toLocaleDateString('pt-BR')}
          </Text>
        </HStack>
        <HStack>
          <Box>
            <Button as={NextLink} href="/posts" variant={'outline'}>
              Voltar
            </Button>
          </Box>
          <Box>
            <Button
              as={NextLink}
              href="https://www.nejm.org/doi/full/10.1056/NEJMoa2212948"
              rightIcon={<HiOutlineExternalLink />}
            >
              Acessar referência
            </Button>
          </Box>
        </HStack>
      </Stack>
    </Layout>
  );
}

export default Post;
