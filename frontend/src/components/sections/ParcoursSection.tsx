'use client';

import { useState } from 'react';
import { Biography, Skill, Education, Experience } from '@/lib/types';
import { useInView } from '@/hooks/useInView';

interface ParcoursSectionProps {
  biography: Biography | null;
  skills: Skill[];
  education: Education[];
  experiences: Experience[];
}

const tabs = [
  { id: 'biography', label: 'BIOGRAPHIE', number: '01' },
  { id: 'skills', label: 'SKILLS', number: '02' },
  { id: 'education', label: 'EDUCATION', number: '03' },
  { id: 'experiences', label: 'EXPERIENCES', number: '04' },
];

export function ParcoursSection({ biography, skills, education, experiences }: ParcoursSectionProps) {
  const [activeTab, setActiveTab] = useState('biography');
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="resume" className="py-20 bg-[linear-gradient(135deg,#052050_60%,#240839_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mes <span className="text-accent">parcours</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Tabs - style maquette avec ligne + numéro */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-0 mb-12 border rounded-full border-accent py-3 px-2">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex cursor-pointer items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-full border-2 transition-all duration-300 text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? 'bg-accent/15 border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:border-accent/40 hover:text-accent/80'
                } ${index > 0 ? 'sm:ml-4' : ''}`}
              >
                <span className="font-semibold tracking-wider">{tab.label}</span>
                <span className="hidden sm:block w-8 h-[2px] bg-current opacity-40" />
                <span className={`font-bold text-base sm:text-lg ${
                  activeTab === tab.id ? 'text-accent' : 'text-text-secondary'
                }`}>
                  {tab.number}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div ref={ref} className={`transition-all duration-500 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {activeTab === 'biography' && <BiographyTab biography={biography} />}
          {activeTab === 'skills' && <SkillsTab skills={skills} />}
          {activeTab === 'education' && <EducationTab education={education} />}
          {activeTab === 'experiences' && <ExperiencesTab experiences={experiences} />}
        </div>
      </div>
    </section>
  );
}

function BiographyTab({ biography }: { biography: Biography | null }) {
  const info = [
    { label: 'Nom', value: biography?.fullName },
    { label: 'Email', value: biography?.email },
    { label: 'Téléphone', value: biography?.phone },
    { label: 'Adresse', value: biography?.address },
    { label: 'Nationalité', value: biography?.nationality },
    { label: 'Langues', value: biography?.languages },
    { label: 'Freelance', value: biography?.freelance },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <p className="text-text-secondary leading-relaxed mb-8 text-center">
        {biography?.aboutText}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {info.filter(i => i.value).map(item => (
          <div key={item.label} className="flex gap-2 p-3 bg-bg-card rounded-lg border border-border">
            <span className="text-accent font-medium text-sm min-w-[100px]">{item.label}:</span>
            <span className="text-text-secondary text-sm">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsTab({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <div className="max-w-6xl mx-auto">
      {categories.map(category => (
        <div key={category} className="mb-8">
          <h4 className="text-sm text-accent uppercase tracking-wider mb-4 capitalize">{category}</h4>
          <div className="space-y-4">
            {skills.filter(s => s.category === category).map(skill => (
              <div key={skill.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-text-primary">{skill.name}</span>
                  <span className="text-sm text-accent">{skill.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent-hover rounded-full skill-bar-fill"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationTab({ education }: { education: Education[] }) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {education.map(edu => (
        <div key={edu.id} className="flex gap-6 p-6 bg-bg-card rounded-xl border border-border">
          <div className="hidden sm:flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <div className="w-0.5 flex-1 bg-border mt-2" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
              <h4 className="text-lg font-semibold text-text-primary">{edu.degree}</h4>
              <span className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
                {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Aujourd'hui"}
              </span>
            </div>
            <p className="text-sm text-accent mb-2">{edu.school}{edu.field ? ` - ${edu.field}` : ''}</p>
            {edu.description && (
              <p className="text-sm text-text-secondary leading-relaxed">{edu.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperiencesTab({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {experiences.map(exp => (
          <div key={exp.id} className="group">
            {/* Header : titre + date */}
            <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
              <h4 className="text-base font-bold text-text-primary">{exp.company}</h4>
              <span className="text-xs text-accent font-medium">
                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Aujourd'hui"}
              </span>
            </div>
            <p className="text-sm text-accent font-medium mb-3">{exp.role}</p>

            {exp.description && (
              <p className="text-sm text-text-primary leading-relaxed mb-4">
                {exp.description}
              </p>
            )}

            {/* Separator */}
            <div className="border-b border-[#2859A5] mt-2 mb-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ['Janv.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}
