﻿using System;

namespace Search
{
    public class BinarySearchSymbolTable : ISymbolTable
    {
        private readonly Item[] data;
        private int count;

        public BinarySearchSymbolTable(int maxN)
        {
            data = new Item[maxN];
            count = 0;
        }

        public void Insert(Item item)
        {
            if (count == data.Length)
            {
                throw new Exception("overflow");
            }
            int i = count++;
            while (i > 0 && item < data[i - 1]) // проход сортировки вставками
            {
                data[i] = data[i - 1];
                i--;
            }
            data[i] = item;
        }

        public int Count()
        {
            return count;
        }

        public Item Search(int key)
        {
            return data[BinarySearch(data, 0, data.Length - 1, key)];
        }

        public void Remove(Item item)
        {
            for (int i = 0; i< data.Length; i++)
            {
                if (data[i].Key == item.Key)
                {
                    data[i] = Item.Empty;
                    return;
                }
            }
        }

        public Item Select(int key)
        {
            return data[key];
        }

        private static int BinarySearch(Item[] data, int l, int r, int key)
        {
            if (l > r)
            {
                throw new IndexOutOfRangeException();
            }
            int m = (r + l)/2;
            if (key == data[m].Key)
            {
                return m;
            }
            if (key < data[m].Key)
            {
                return BinarySearch(data, l, m - 1, key);
            }
            else
            {
                return BinarySearch(data, m+1, r, key);
            }
        }
    }
}
