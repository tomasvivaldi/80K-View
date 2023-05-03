import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Shell } from '@/template/Shell';
import { UnderConstruction } from '@/template/UnderConstruction';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => (
  <>
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Shell title="Under Construction">
      <Section>
        <UnderConstruction />
      </Section>
    </Shell>
  </>
);

export default Index;
