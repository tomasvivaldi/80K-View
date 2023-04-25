import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import AnswerSection from '@/template/AnswerSection';
import { Shell } from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => (
  <>
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Shell title="Forms">
      <Section>
        <AnswerSection />
      </Section>
    </Shell>
  </>
);

export default Index;
