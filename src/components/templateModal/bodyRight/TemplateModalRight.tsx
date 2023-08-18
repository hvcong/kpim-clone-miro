import React from 'react';
import TemplateGroup from './TemplateGroup';
import { CloseIcon, SearchIcon } from '@/components/svgs';
import TemplateSearchDropdown from './TemplateSearchDropdown';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getTemplateList } from '@/components/dashboard/TemplateList';

type Props = {
  className: string;
  itemActived: string;
};

export default function TemplateModalRight({ className, itemActived }: Props) {
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { data } = useQuery(
    ['get_template_list', itemActived],
    getTemplateList,
  );

  let list = data?.data?.list || [];

  let title = '';

  if (itemActived === 'my-template') title = 'My template';
  if (itemActived === 'recent') title = 'Recent';
  if (itemActived === 'popular') title = 'Popular';
  if (itemActived === 'building-block') title = 'Building Blocks';

  return (
    <div className={className}>
      <div className="flex flex-col h-full">
        <div className="flex pb-4 px-3">
          <div className="flex-1 flex relative">
            <div className="px-2 absolute left-0 top-0 flex items-center cursor-pointer">
              <SearchIcon className="w-5 h-5 text-gray-700 " />
            </div>
            <input
              placeholder="Search templates by name"
              className="flex-1 outline-none border-b pb-2 px-10 border-b-gray-500 focus:border-b-blue-500"
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              value={inputValue}
              onChange={({ target }) => {
                setInputValue(target.value);
              }}
            />
            <div
              className="absolute right-0 top-0  flex items-center cursor-pointer "
              onClick={() => {
                setInputValue('');
              }}
            >
              {inputValue && <CloseIcon className="w-5 h-5 text-gray-700 " />}
            </div>
            {inputFocused && !inputValue && (
              <TemplateSearchDropdown className="absolute top-full left-0 right-0 translate-y-2 shadow-lg rounded z-20" />
            )}
          </div>
          <div className="flex items-center space-x-3 mx-10">
            <input type="checkbox" className="h-3 w-3" />
            <div className="text-sm">Show when creating a paper</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto pl-3 pr-14">
          <TemplateGroup className="" title={title} list={list} />
        </div>
      </div>
    </div>
  );
}
